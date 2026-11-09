import React, { useEffect, useRef, useState } from 'react';

interface PreloaderProps {
  onComplete?: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [colWidth, setColWidth] = useState<number>(760);
  const [progress, setProgress] = useState<number>(0);
  const [isWiping, setIsWiping] = useState<boolean>(false);
  const [isDone, setIsDone] = useState<boolean>(false);
  const [isTextPhase, setIsTextPhase] = useState<boolean>(false);
  
  const plRef = useRef<HTMLDivElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check reduced motion or session skip
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isSkipped = false; // Always run on page load as requested by user prompt for the full experience

    if (prefersReducedMotion || isSkipped) {
      setIsDone(true);
      onComplete?.();
      return;
    }

    document.documentElement.classList.add('js');
    document.documentElement.style.overflow = 'hidden';
    window.scrollTo(0, 0);

    const sheet = sheetRef.current;
    if (!sheet) return;

    const DUR = 3200;
    const FREEZE = 70;
    const TEXT_PHASE = 84;
    const MAX_BOXES = 75;
    let boxes: Array<{
      x: number;
      y: number;
      w: number;
      h: number;
      k: string;
      lab: string;
      rad?: string;
      text?: string;
      st?: Record<string, string>;
      pad?: { l: number; t: number; r: number };
      n?: HTMLDivElement;
      dim?: HTMLDivElement;
    }> = [];
    let frozen = false;

    function pad2(n: number) {
      return String(n).padStart(2, '0');
    }

    function visibleRect(el: Element, r: DOMRect) {
      let x1 = r.left, y1 = r.top, x2 = r.right, y2 = r.bottom;
      for (let a = el.parentElement; a && a !== document.body; a = a.parentElement) {
        if (getComputedStyle(a).overflow === 'visible') continue;
        const ar = a.getBoundingClientRect();
        x1 = Math.max(x1, ar.left);
        y1 = Math.max(y1, ar.top);
        x2 = Math.min(x2, ar.right);
        y2 = Math.min(y2, ar.bottom);
        if (x2 - x1 < 1 || y2 - y1 < 1) return null;
      }
      return { left: x1, top: y1, right: x2, bottom: y2, width: x2 - x1, height: y2 - y1 };
    }

    function seenText(el: Element): string {
      let s = '';
      function walkNode(n: Node) {
        n.childNodes.forEach((c) => {
          if (c.nodeType === Node.TEXT_NODE) {
            s += c.textContent || '';
          } else if (c.nodeType === Node.ELEMENT_NODE) {
            const cs = getComputedStyle(c as Element);
            if (cs.display !== 'none' && cs.visibility !== 'hidden' && parseFloat(cs.opacity) >= 0.05) {
              walkNode(c);
            }
          }
        });
      }
      walkNode(el);
      return s.replace(/\s+/g, ' ').trim();
    }

    function textStyle(cs: CSSStyleDeclaration) {
      return {
        fontFamily: cs.fontFamily,
        fontSize: cs.fontSize,
        fontWeight: cs.fontWeight,
        fontStyle: cs.fontStyle,
        lineHeight: cs.lineHeight,
        letterSpacing: cs.letterSpacing,
        textAlign: cs.textAlign,
      };
    }

    function scan() {
      const W = window.innerWidth, H = window.innerHeight;
      const out: typeof boxes = [];
      const n = { text: 0, link: 0, btn: 0 };
      const SKIP: Record<string, boolean> = { pl: true, me: true, pal: true, toast: true, smenu: true, cpop: true };

      function walk(el: Element) {
        if (out.length >= MAX_BOXES || (el.id && SKIP[el.id]) || el.classList.contains('decor') ||
            /^(SCRIPT|STYLE|NOSCRIPT|LINK|META|INPUT|FORM)$/.test(el.tagName)) return;

        const cs = getComputedStyle(el);
        if (cs.display === 'none' || cs.visibility === 'hidden' || parseFloat(cs.opacity) < 0.05) return;

        const r = el.getBoundingClientRect();
        const has = r.width >= 2 && r.height >= 2;
        const tag = el.tagName.toLowerCase();

        if (has && (r.bottom < 0 || r.top > H || r.right < 0 || r.left > W)) return;
        const vRect = has ? visibleRect(el, r) : null;
        if (has && !vRect) return;
        const rect = vRect || { left: r.left, top: r.top, width: r.width, height: r.height };

        const box: typeof boxes[0] = {
          x: rect.left,
          y: rect.top,
          w: rect.width,
          h: rect.height,
          k: 'card',
          lab: 'BOX',
          rad: cs.borderRadius,
        };

        if (el.id === 'banner') {
          box.k = 'media';
          box.lab = 'FRAME 01';
          out.push(box);
          return;
        }

        if (tag === 'svg') {
          if (has && rect.width >= 10) {
            box.k = 'media';
            box.lab = 'ICON';
            box.rad = '4px';
            out.push(box);
          }
          return;
        }

        if (has && (tag === 'img' || tag === 'video')) {
          box.k = 'media';
          box.lab = rect.width > rect.height * 2.2 && rect.width > 300 ? 'BANNER' : rect.width >= 60 ? 'IMAGE' : 'ICON';
          out.push(box);
          return;
        }

        const isBtn = tag === 'button' || el.getAttribute('role') === 'button';
        const isLink = tag === 'a' && !el.querySelector('img') && rect.height < 90 && !el.closest('#rail');

        if (has && (isBtn || isLink) && rect.height < 100) {
          const t = seenText(el);
          const framed = parseFloat(cs.borderTopWidth) > 0 || cs.backgroundColor !== 'rgba(0, 0, 0, 0)';
          box.k = isLink && !framed ? 'text' : 'btn';
          box.lab = !t ? 'ICON' : box.k === 'text' ? 'LINK ' + pad2(++n.link) : 'BUTTON ' + pad2(++n.btn);
          if (t) {
            box.text = t;
            box.st = textStyle(cs);
            box.pad = {
              l: parseFloat(cs.paddingLeft) + parseFloat(cs.borderLeftWidth),
              t: parseFloat(cs.paddingTop) + parseFloat(cs.borderTopWidth),
              r: parseFloat(cs.paddingRight) + parseFloat(cs.borderRightWidth),
            };
          }
          out.push(box);
          return;
        }

        if (has && rect.height >= 50 && rect.height <= 360 && !el.querySelector('img') &&
            parseFloat(cs.borderTopWidth) > 0 && cs.borderTopStyle !== 'none' &&
            parseFloat(cs.borderTopLeftRadius) >= 8) {
          out.push({
            k: 'card',
            x: rect.left,
            y: rect.top,
            w: rect.width,
            h: rect.height,
            rad: cs.borderRadius,
            lab: 'CARD',
          });
        }

        let own = '';
        el.childNodes.forEach((c) => {
          if (c.nodeType === Node.TEXT_NODE) own += c.textContent || '';
        });

        if (has && own.trim()) {
          box.k = 'text';
          box.lab = tag === 'h1' ? 'TITLE' : /^h[2-6]$/.test(tag) ? 'H' + tag[1] : 'TEXT ' + pad2(++n.text);
          box.text = ((el as HTMLElement).innerText || own).trim();
          box.st = textStyle(cs);
          box.pad = {
            l: parseFloat(cs.paddingLeft),
            t: parseFloat(cs.paddingTop),
            r: parseFloat(cs.paddingRight),
          };
          out.push(box);
          return;
        }

        for (let i = 0; i < el.children.length; i++) {
          walk(el.children[i]);
        }
      }

      walk(document.body);
      return out.sort((a, b) => a.y - b.y || a.x - b.x);
    }

    function createEl<K extends keyof HTMLElementTagNameMap>(
      tag: K,
      cls?: string,
      parent?: HTMLElement
    ): HTMLElementTagNameMap[K] {
      const el = document.createElement(tag);
      if (cls) el.className = cls;
      if (parent) parent.appendChild(el);
      return el;
    }

    function paint(pct: number) {
      const M = Math.max(boxes.length - 1, 1);
      boxes.forEach((b, i) => {
        const on = pct >= 4 + (i / M) * (76 - 4);
        b.n?.classList.toggle('on', on);
        b.dim?.classList.toggle('on', on);
      });
      setIsTextPhase(pct >= TEXT_PHASE);
    }

    let lastPct = 0;

    function renderWireframe() {
      if (frozen || !sheet) return;
      boxes = scan();

      // Clear existing wireframe nodes
      sheet?.querySelectorAll('.pl-box, .pl-dim, .pl-guide').forEach((n) => n.remove());

      const col = document.querySelector('main > .col, .col');
      if (col) {
        const cr = col.getBoundingClientRect();
        setColWidth(Math.round(cr.width));
        [cr.left, cr.right].forEach((x) => {
          const g = createEl('div', 'pl-guide', sheet);
          g.style.left = Math.round(x) + 'px';
        });
      }

      boxes.forEach((b) => {
        const n = createEl('div', 'pl-box ' + b.k, sheet);
        n.style.cssText = `left:${b.x}px;top:${b.y}px;width:${b.w}px;height:${b.h}px;--r:${b.rad || '0px'}`;
        createEl('div', 'f', n);

        if (b.k === 'media') {
          n.insertAdjacentHTML(
            'beforeend',
            '<svg viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0 0L100 100M100 0L0 100" vector-effect="non-scaling-stroke"/></svg>'
          );
        }

        if (b.w >= 56 && b.h >= 14) {
          const c = createEl('span', 'pl-chip lab', n);
          c.textContent = b.lab;
        }

        if (b.text) {
          const g = createEl('div', 'g' + (b.k === 'btn' ? ' c' : ''), n);
          const p = b.pad || { l: 0, t: 0, r: 0 };
          if (b.st) {
            for (const k in b.st) {
              // @ts-expect-error style key assignment
              g.style[k] = b.st[k];
            }
          }
          g.style.left = p.l + 'px';
          g.style.top = p.t + 'px';
          g.style.width = Math.max(0, b.w - p.l - p.r) + 'px';
          if (b.k === 'btn') g.style.height = Math.max(0, b.h - p.t * 2) + 'px';
          g.textContent = b.text;
        }

        b.n = n;

        if (b.k === 'text' && b.w >= 300 && b.h >= 20) {
          const dm = createEl('div', 'pl-dim', sheet);
          dm.style.cssText = `left:${b.x}px;top:${b.y + b.h + 7}px;width:${b.w}px`;
          const ch = createEl('span', 'pl-chip', dm);
          ch.textContent = String(Math.round(b.w));
          b.dim = dm;
        }
      });

      paint(lastPct);
    }

    // Schedule incremental scans as content fonts/images settle
    const tTimers = [80, 400, 900, 1500].map((t) => setTimeout(renderWireframe, t));
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(renderWireframe);
    }

    const onResize = () => renderWireframe();
    window.addEventListener('resize', onResize);

    const t0 = performance.now();
    let animId: number;

    function tick(now: number) {
      const k = Math.min((now - t0) / DUR, 1);
      const e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
      let pct = e * 100;
      pct = Math.min(Math.floor(pct + (k >= 1 ? 1 : 0)), 100);

      if (pct !== lastPct) {
        lastPct = pct;
        setProgress(pct);
        paint(pct);
        if (pct >= FREEZE) frozen = true;
      }

      if (pct >= 100) {
        setTimeout(() => {
          setIsWiping(true);
          document.documentElement.style.overflow = '';
          setTimeout(() => {
            setIsDone(true);
            onComplete?.();
          }, 1100);
        }, 300);
        return;
      }

      animId = requestAnimationFrame(tick);
    }

    animId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', onResize);
      tTimers.forEach(clearTimeout);
      document.documentElement.style.overflow = '';
    };
  }, [onComplete]);

  if (isDone) return null;

  return (
    <div
      id="pl"
      ref={plRef}
      className={`${isWiping ? 'wipe' : ''} ${isTextPhase ? 'txt' : ''}`}
      aria-hidden="true"
    >
      <div className="pl-sheet" ref={sheetRef}>
        <div className="pl-edge" />
        <div className="pl-note l">frame 01 · sunilkumar · wireframe</div>
        <div className="pl-note r">
          <span id="plCol">{colWidth}</span>px column · <span id="plPct">{progress}</span>%
        </div>
      </div>
    </div>
  );
};
