import React, { useState, useRef, useEffect } from 'react';
import { portfolioData } from '../data/portfolio';
import { playSfx } from '../utils/sfx';

interface CanvasObject {
  id: string;
  type: 'text' | 'rect' | 'ellipse' | 'badge';
  x: number;
  y: number;
  w?: number;
  h?: number;
  text?: string;
  fill?: string;
  stroke?: string;
  font?: string;
  size?: number;
  weight?: number;
}

export const HeroCanvas: React.FC = () => {
  const [activeTool, setActiveTool] = useState<'move' | 'rect' | 'ellipse' | 'text'>('move');
  const [objects, setObjects] = useState<CanvasObject[]>([
    {
      id: 'headline',
      type: 'text',
      x: 180,
      y: 95,
      text: portfolioData.heroHeadline,
      fill: 'var(--fg)',
      font: 'serif',
      size: 46,
      weight: 400
    }
  ]);
  const [selectedId, setSelectedId] = useState<string | null>('headline');
  const [showAiBar, setShowAiBar] = useState<boolean>(false);
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [canvasTouched, setCanvasTouched] = useState<boolean>(false);
  
  const canvasRef = useRef<HTMLDivElement>(null);
  const [dragOffset, setDragOffset] = useState<{ x: number; y: number } | null>(null);

  const resetCanvas = () => {
    playSfx('whoosh');
    setObjects([
      {
        id: 'headline',
        type: 'text',
        x: 180,
        y: 95,
        text: portfolioData.heroHeadline,
        fill: 'var(--fg)',
        font: 'serif',
        size: 46,
        weight: 400
      }
    ]);
    setSelectedId('headline');
    setActiveTool('move');
    setShowAiBar(false);
    setCanvasTouched(false);
  };

  const handleCanvasClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (activeTool === 'move') {
      if ((e.target as HTMLElement).id === 'banner' || (e.target as HTMLElement).classList.contains('layer')) {
        setSelectedId(null);
      }
      return;
    }

    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = Math.round(e.clientX - rect.left);
    const y = Math.round(e.clientY - rect.top);

    playSfx('pop');
    setCanvasTouched(true);

    if (activeTool === 'rect') {
      const newObj: CanvasObject = {
        id: 'rect_' + Date.now(),
        type: 'rect',
        x: x - 40,
        y: y - 25,
        w: 80,
        h: 50,
        fill: 'rgba(13, 153, 255, 0.15)',
        stroke: 'var(--sel)'
      };
      setObjects((prev) => [...prev, newObj]);
      setSelectedId(newObj.id);
      setActiveTool('move');
    } else if (activeTool === 'ellipse') {
      const newObj: CanvasObject = {
        id: 'ellipse_' + Date.now(),
        type: 'ellipse',
        x: x - 30,
        y: y - 30,
        w: 60,
        h: 60,
        fill: 'rgba(33, 199, 138, 0.15)',
        stroke: 'var(--green)'
      };
      setObjects((prev) => [...prev, newObj]);
      setSelectedId(newObj.id);
      setActiveTool('move');
    } else if (activeTool === 'text') {
      const newObj: CanvasObject = {
        id: 'text_' + Date.now(),
        type: 'text',
        x: x,
        y: y,
        text: 'New Text',
        fill: 'var(--fg)',
        font: 'sans',
        size: 16,
        weight: 500
      };
      setObjects((prev) => [...prev, newObj]);
      setSelectedId(newObj.id);
      setActiveTool('move');
    }
  };

  const handleAiSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!aiPrompt.trim()) return;
    playSfx('sparkle');
    setCanvasTouched(true);

    const promptLower = aiPrompt.toLowerCase();
    if (promptLower.includes('cta') || promptLower.includes('button')) {
      const newBtn: CanvasObject = {
        id: 'btn_' + Date.now(),
        type: 'badge',
        x: 480,
        y: 195,
        w: 120,
        h: 36,
        text: 'Get in touch →',
        fill: 'var(--fg)'
      };
      setObjects((prev) => [...prev, newBtn]);
      setSelectedId(newBtn.id);
    } else if (promptLower.includes('badge') || promptLower.includes('star')) {
      const newBadge: CanvasObject = {
        id: 'badge_' + Date.now(),
        type: 'badge',
        x: 190,
        y: 45,
        w: 130,
        h: 24,
        text: '★ Available for Q2',
        fill: 'var(--amber)'
      };
      setObjects((prev) => [...prev, newBadge]);
      setSelectedId(newBadge.id);
    } else {
      const newShape: CanvasObject = {
        id: 'shape_' + Date.now(),
        type: 'rect',
        x: 320,
        y: 70,
        w: 160,
        h: 90,
        fill: 'rgba(217, 119, 87, 0.12)',
        stroke: 'var(--claude)'
      };
      setObjects((prev) => [...prev, newShape]);
      setSelectedId(newShape.id);
    }

    setAiPrompt('');
    setShowAiBar(false);
  };

  // Center the initial headline dynamically once canvas width is known
  useEffect(() => {
    if (canvasRef.current) {
      const w = canvasRef.current.clientWidth;
      setObjects((prev) =>
        prev.map((obj) =>
          obj.id === 'headline'
            ? { ...obj, x: Math.max(20, Math.round(w / 2 - 170)) }
            : obj
        )
      );
    }
  }, []);

  const selectedObj = objects.find((o) => o.id === selectedId);

  return (
    <div className="bwrap">
      <div
        id="banner"
        className="banner"
        ref={canvasRef}
        data-tool={activeTool}
        onClick={handleCanvasClick}
      >
        {/* Frame metadata label */}
        <div className="flabel" aria-hidden="true">
          <span># Frame 1</span>
          <span>·</span>
          <b>portfolio / home</b>
        </div>

        {/* Reset canvas button */}
        {canvasTouched && (
          <button
            className="freset"
            id="freset"
            type="button"
            onClick={resetCanvas}
          >
            Reset canvas ↺
          </button>
        )}

        {/* Canvas objects layer */}
        <div className="layer">
          {objects.map((obj) => {
            const isSel = obj.id === selectedId;
            if (obj.type === 'text') {
              return (
                <div
                  key={obj.id}
                  id={obj.id}
                  className={`obj text ${isSel ? 'selected' : ''}`}
                  style={{
                    left: `${obj.x}px`,
                    top: `${obj.y}px`,
                    fontSize: `${obj.size}px`,
                    fontFamily:
                      obj.font === 'serif'
                        ? 'var(--serif)'
                        : obj.font === 'mono'
                        ? 'var(--mono)'
                        : 'var(--sans)',
                    fontWeight: obj.weight || 400,
                    color: obj.fill || 'var(--fg)',
                    cursor: activeTool === 'move' ? 'grab' : 'crosshair'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    playSfx('click');
                    setSelectedId(obj.id);
                  }}
                >
                  {obj.text}
                </div>
              );
            }

            if (obj.type === 'rect') {
              return (
                <div
                  key={obj.id}
                  className="obj rect"
                  style={{
                    left: `${obj.x}px`,
                    top: `${obj.y}px`,
                    width: `${obj.w}px`,
                    height: `${obj.h}px`,
                    background: obj.fill,
                    border: `1.5px solid ${obj.stroke || 'var(--sel)'}`,
                    borderRadius: '8px',
                    cursor: activeTool === 'move' ? 'grab' : 'crosshair'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    playSfx('click');
                    setSelectedId(obj.id);
                  }}
                />
              );
            }

            if (obj.type === 'ellipse') {
              return (
                <div
                  key={obj.id}
                  className="obj ellipse"
                  style={{
                    left: `${obj.x}px`,
                    top: `${obj.y}px`,
                    width: `${obj.w}px`,
                    height: `${obj.h}px`,
                    background: obj.fill,
                    border: `1.5px solid ${obj.stroke || 'var(--green)'}`,
                    borderRadius: '50%',
                    cursor: activeTool === 'move' ? 'grab' : 'crosshair'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    playSfx('click');
                    setSelectedId(obj.id);
                  }}
                />
              );
            }

            if (obj.type === 'badge') {
              return (
                <div
                  key={obj.id}
                  className="obj badge"
                  style={{
                    left: `${obj.x}px`,
                    top: `${obj.y}px`,
                    padding: '4px 10px',
                    background: 'var(--card)',
                    border: '1px solid var(--line)',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontFamily: 'var(--mono)',
                    color: obj.fill || 'var(--fg)',
                    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                    cursor: activeTool === 'move' ? 'grab' : 'crosshair'
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    playSfx('click');
                    setSelectedId(obj.id);
                  }}
                >
                  {obj.text}
                </div>
              );
            }

            return null;
          })}

          {/* Selection bounding box around selected object */}
          {selectedObj && (
            <div
              id="selbox"
              style={{
                left: `${selectedObj.x - 4}px`,
                top: `${selectedObj.y - 4}px`,
                width: `${(selectedObj.w || 340) + 8}px`,
                height: `${(selectedObj.h || 54) + 8}px`
              }}
            >
              <i data-h="nw" />
              <i data-h="ne" />
              <i data-h="sw" />
              <i data-h="se" />
              <div id="dim">{portfolioData.heroFontBadge}</div>
            </div>
          )}
        </div>

        {/* Floating cursors inside canvas */}
        <div className="curs" aria-hidden="true">
          {/* Orange Try Canvas cursor */}
          <div
            className="cur demo"
            style={{
              position: 'absolute',
              left: selectedObj ? `${selectedObj.x + 310}px` : '490px',
              top: selectedObj ? `${selectedObj.y - 12}px` : '85px',
              color: 'var(--amber)',
              transition: 'transform 0.4s ease'
            }}
          >
            <svg viewBox="0 0 16 16" fill="currentColor">
              <path d="M0 0l6 14 3-5 5-3L0 0z" />
            </svg>
            <span className="nm">Try Canvas</span>
          </div>

          {/* Claude AI cursor */}
          <div
            className="cur claude"
            style={{
              position: 'absolute',
              color: 'var(--claude)'
            }}
          >
            <svg viewBox="0 0 16 16" fill="currentColor">
              <path d="M0 0l6 14 3-5 5-3L0 0z" />
            </svg>
            <span className="nm">Claude</span>
          </div>
        </div>

        {/* Toolbar in bottom-left and AI CTA in bottom-right */}
        {!showAiBar ? (
          <div className="tb" id="tb">
            <div className="tbox">
              <button
                type="button"
                className={activeTool === 'move' ? 'on' : ''}
                title="Select / Move (V)"
                onClick={() => {
                  playSfx('click');
                  setActiveTool('move');
                }}
              >
                <svg className="i"><use href="#s-arrow" /></svg>
              </button>
              <button
                type="button"
                className={activeTool === 'rect' ? 'on' : ''}
                title="Rectangle (R)"
                onClick={() => {
                  playSfx('click');
                  setActiveTool('rect');
                }}
              >
                <svg className="i"><use href="#s-rect" /></svg>
              </button>
              <button
                type="button"
                className={activeTool === 'text' ? 'on' : ''}
                title="Text (T)"
                onClick={() => {
                  playSfx('click');
                  setActiveTool('text');
                }}
              >
                <svg className="i"><use href="#i-pen" /></svg>
              </button>
              <button
                type="button"
                className={activeTool === 'ellipse' ? 'on' : ''}
                title="Ellipse (O)"
                onClick={() => {
                  playSfx('click');
                  setActiveTool('ellipse');
                }}
              >
                <svg className="i"><use href="#s-ellipse" /></svg>
              </button>
            </div>

            <div className="tbox">
              <button
                type="button"
                className="ask"
                id="askBtn"
                onClick={() => {
                  playSfx('open');
                  setShowAiBar(true);
                }}
              >
                <span className="st">✦</span> Ask AI to design
              </button>
            </div>
          </div>
        ) : (
          <form className="askbar" id="askbar" onSubmit={handleAiSubmit}>
            <span className="spark">✦</span>
            <input
              id="askIn"
              type="text"
              placeholder="e.g. Add a CTA button, create a status badge..."
              autoFocus
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
            />
            <div className="chipsq">
              <button
                type="button"
                className="chipq"
                onClick={() => setAiPrompt('Add a CTA button')}
              >
                + CTA
              </button>
              <button
                type="button"
                className="chipq"
                onClick={() => setAiPrompt('Add an available badge')}
              >
                + Badge
              </button>
              <button
                type="button"
                className="chipq"
                onClick={() => setAiPrompt('Add a frame')}
              >
                + Frame
              </button>
            </div>
            <button type="submit" className="go">Generate</button>
            <button
              type="button"
              className="aclose"
              onClick={() => {
                playSfx('close');
                setShowAiBar(false);
              }}
            >
              ×
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

