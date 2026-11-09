import React, { useState, useEffect, useRef, useCallback } from 'react';
import { quotePortraits, QuotePortrait } from '../data/quotes';
import { playSfx } from '../utils/sfx';

export const PortraitExperiment: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [algo, setAlgo] = useState<'bayer' | 'atk' | 'fs' | 'noise'>('bayer');
  const [pixelSize, setPixelSize] = useState<number>(1);
  const [contrast, setContrast] = useState<number>(0);
  const [brightness, setBrightness] = useState<number>(0);
  const [invert, setInvert] = useState<boolean>(false);

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const workCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const loadedImagesRef = useRef<Record<string, HTMLImageElement>>({});

  const currentQuote: QuotePortrait = quotePortraits[currentIndex];

  const BAYER = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];

  const drawPortrait = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    if (!workCanvasRef.current) {
      workCanvasRef.current = document.createElement('canvas');
    }
    const workCanvas = workCanvasRef.current;
    const workCtx = workCanvas.getContext('2d', { willReadFrequently: true });
    if (!workCtx) return;

    const imgKey = currentQuote.imageKey;
    let img = loadedImagesRef.current[imgKey];

    if (!img) {
      img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = `/images/quotes/${imgKey}.jpg`;
      img.onload = () => {
        loadedImagesRef.current[imgKey] = img;
        drawPortrait();
      };
      return;
    }

    if (!img.complete || !img.naturalWidth) return;

    const s = pixelSize;
    const w = Math.floor(240 / s);
    const h = Math.floor(300 / s);
    const n = w * h;

    if (workCanvas.width !== w || workCanvas.height !== h) {
      workCanvas.width = w;
      workCanvas.height = h;
    }
    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
    }

    workCtx.drawImage(img, 0, 0, w, h);
    const imgData = workCtx.getImageData(0, 0, w, h);
    const d = imgData.data;

    // Convert to Luminance Float32
    const L = new Float32Array(n);
    const hist = new Uint32Array(256);
    let lo = 0, hi = 255, acc = 0;

    for (let i = 0, j = 0; i < n; i++, j += 4) {
      L[i] = 0.299 * d[j] + 0.587 * d[j + 1] + 0.114 * d[j + 2];
      hist[Math.floor(L[i])]++;
    }

    // Auto-levels stretch (2% - 98%)
    for (let i = 0; i < 256; i++) {
      acc += hist[i];
      if (acc > n * 0.02) {
        lo = i;
        break;
      }
    }
    acc = 0;
    for (let i = 255; i >= 0; i--) {
      acc += hist[i];
      if (acc > n * 0.02) {
        hi = i;
        break;
      }
    }

    const k = 255 / Math.max(40, hi - lo);
    const f = Math.tan(((Math.min(contrast, 98) + 100) / 200) * (Math.PI / 2));
    const b = brightness * 1.28 + (currentQuote.lift || 0);

    for (let i = 0; i < n; i++) {
      const v = ((L[i] - lo) * k - 128) * f + 128 + b;
      L[i] = v < 0 ? 0 : v > 255 ? 255 : v;
    }

    // Dither algorithms
    const mask = new Uint8Array(n);
    if (algo === 'bayer') {
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          mask[y * w + x] = L[y * w + x] > (BAYER[(y & 3) * 4 + (x & 3)] + 0.5) * 16 ? 1 : 0;
        }
      }
    } else if (algo === 'atk') {
      // Atkinson error diffusion
      const buf = new Float32Array(L);
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const i = y * w + x;
          const v = buf[i];
          const out = v >= 128 ? 1 : 0;
          mask[i] = out;
          const err = (v - (out ? 255 : 0)) / 8;
          if (x + 1 < w) buf[i + 1] += err;
          if (x + 2 < w) buf[i + 2] += err;
          if (y + 1 < h) {
            if (x > 0) buf[i + w - 1] += err;
            buf[i + w] += err;
            if (x + 1 < w) buf[i + w + 1] += err;
          }
          if (y + 2 < h) buf[i + 2 * w] += err;
        }
      }
    } else if (algo === 'fs') {
      // Floyd-Steinberg error diffusion
      const buf = new Float32Array(L);
      for (let y = 0; y < h; y++) {
        const d_dir = y & 1 ? -1 : 1;
        for (let x = d_dir > 0 ? 0 : w - 1; x >= 0 && x < w; x += d_dir) {
          const i = y * w + x;
          const v = buf[i];
          const out = v >= 128 ? 1 : 0;
          mask[i] = out;
          const err = v - (out ? 255 : 0);
          if (x + d_dir >= 0 && x + d_dir < w) buf[i + d_dir] += (err * 7) / 16;
          if (y + 1 < h) {
            if (x - d_dir >= 0 && x - d_dir < w) buf[i + w - d_dir] += (err * 3) / 16;
            buf[i + w] += (err * 5) / 16;
            if (x + d_dir >= 0 && x + d_dir < w) buf[i + w + d_dir] += err / 16;
          }
        }
      }
    } else if (algo === 'noise') {
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const noise = Math.sin(x * 12.9898 + y * 78.233) * 43758.5453;
          mask[y * w + x] = L[y * w + x] > (noise - Math.floor(noise)) * 255 ? 1 : 0;
        }
      }
    }

    // Paint into canvas based on current theme
    const isDark = document.documentElement.dataset.theme !== 'light';
    const lit = isDark ? [245, 245, 244] : [24, 24, 27];
    const ink = isDark ? [10, 10, 10] : [252, 252, 251];

    const outData = ctx.createImageData(w, h);
    const o = outData.data;

    for (let i = 0, j = 0; i < n; i++, j += 4) {
      const bit = mask[i] ^ (invert ? 1 : 0);
      const color = bit ? lit : ink;
      o[j] = color[0];
      o[j + 1] = color[1];
      o[j + 2] = color[2];
      o[j + 3] = 255;
    }

    ctx.putImageData(outData, 0, 0);
  }, [currentIndex, currentQuote, algo, pixelSize, contrast, brightness, invert]);

  useEffect(() => {
    drawPortrait();
  }, [drawPortrait]);

  // Redraw when theme changes
  useEffect(() => {
    const observer = new MutationObserver(() => {
      drawPortrait();
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    return () => observer.disconnect();
  }, [drawPortrait]);

  const nextQuote = () => {
    playSfx('click');
    setCurrentIndex((prev) => (prev + 1) % quotePortraits.length);
  };

  const prevQuote = () => {
    playSfx('click');
    setCurrentIndex((prev) => (prev - 1 + quotePortraits.length) % quotePortraits.length);
  };

  const resetControls = () => {
    playSfx('whoosh');
    setAlgo('bayer');
    setPixelSize(1);
    setContrast(0);
    setBrightness(0);
    setInvert(false);
  };

  return (
    <div className="quote" id="quote">
      <figure className="qfig">
        <canvas
          id="qc"
          ref={canvasRef}
          width="240"
          height="300"
          role="img"
          aria-label={`Dithered portrait of ${currentQuote.author}`}
        />
        <figcaption id="qcr">
          <a href={currentQuote.sourceUrl} target="_blank" rel="noopener noreferrer">
            Photo: {currentQuote.by}
          </a>{' '}
          · {currentQuote.license} · dithered
        </figcaption>
      </figure>

      <div className="qbody">
        <div className="qtext">
          <div className="q" aria-hidden="true">“</div>
          <blockquote id="qt">{currentQuote.text}</blockquote>
          <cite id="qa">— {currentQuote.author}</cite>
        </div>

        {/* Quote switcher navigation */}
        <div className="qnav">
          <button className="qbtn" id="qprev" type="button" onClick={prevQuote}>
            ← Prev
          </button>
          <span id="qn">
            {String(currentIndex + 1).padStart(2, '0')} / {String(quotePortraits.length).padStart(2, '0')}
          </span>
          <button className="qbtn" id="qnext" type="button" onClick={nextQuote}>
            Next →
          </button>
        </div>

        {/* Interactive effect control panel */}
        <div className="qctl">
          <div className="qalgo" id="qalgo">
            {(
              [
                ['bayer', 'Bayer (Halftone)'],
                ['atk', 'Atkinson'],
                ['fs', 'Floyd-Steinberg'],
                ['noise', 'Noise']
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                className="qbtn"
                aria-pressed={algo === key}
                onClick={() => {
                  playSfx('click');
                  setAlgo(key);
                }}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="qrow">
            <span>Pixel:</span>
            <input
              id="qpx"
              type="range"
              min="1"
              max="8"
              step="1"
              value={pixelSize}
              onChange={(e) => {
                setPixelSize(Number(e.target.value));
              }}
            />
            <output id="qpxv">{pixelSize}px</output>
          </div>

          <div className="qrow">
            <span>Contrast:</span>
            <input
              id="qcon"
              type="range"
              min="-50"
              max="50"
              value={contrast}
              onChange={(e) => {
                setContrast(Number(e.target.value));
              }}
            />
            <output id="qconv">{contrast > 0 ? `+${contrast}` : contrast}</output>
          </div>

          <div className="qrow">
            <span>Brightness:</span>
            <input
              id="qbri"
              type="range"
              min="-50"
              max="50"
              value={brightness}
              onChange={(e) => {
                setBrightness(Number(e.target.value));
              }}
            />
            <output id="qbriv">{brightness > 0 ? `+${brightness}` : brightness}</output>
          </div>

          <div className="qacts">
            <button
              className="qbtn"
              id="qinv"
              type="button"
              aria-pressed={invert}
              onClick={() => {
                playSfx('toggle');
                setInvert(!invert);
              }}
            >
              Invert
            </button>
            <button
              className="qbtn"
              id="qrst"
              type="button"
              onClick={resetControls}
            >
              Reset
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
