import React, { useEffect, useRef, useState } from 'react';
import { portfolioData } from '../data/portfolio';
import { playSfx } from '../utils/sfx';

export const About: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const cv = canvasRef.current;
    const lb = labelRef.current;
    if (!cv || !lb) return;

    const GW = 96, GH = 100;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const ctx = cv.getContext('2d');
    if (!ctx) return;

    cv.width = GW * dpr;
    cv.height = GH * dpr;
    ctx.scale(dpr, dpr);

    const C = {
      K: '#1a1311', H: '#1c1715', h: '#3d332c', S: '#bb7f57', s: '#9b6540',
      B: '#261e1a', b: '#3a2e27', E: '#f4efe8', P: '#141010', M: '#6f3b2b',
      T: '#eceef1', t: '#c5c9d1', J: '#3d4163', j: '#2c2f4b', w: '#24263d',
      X: '#222328', O: '#e7e8eb', R: '#2b2b30', G: '#c9cdd4', Y: '#dab55c'
    };

    let buf: (string | undefined)[] = [];
    function put(x: number, y: number, c: string) {
      x = Math.floor(x);
      y = Math.floor(y);
      if (x >= 0 && y >= 0 && x < GW && y < GH) buf[y * GW + x] = c;
    }

    function inE(x: number, y: number, cx: number, cy: number, rx: number, ry: number) {
      const dx = (x + 0.5 - cx) / rx;
      const dy = (y + 0.5 - cy) / ry;
      return dx * dx + dy * dy <= 1;
    }

    function headFront(blink: number) {
      const w = 36, h = 32;
      const m: Record<number, string> = {};
      function set(x: number, y: number, c: string) {
        if (x >= 0 && y >= 0 && x < w && y < h) m[y * w + x] = c;
      }
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          if (inE(x, y, 18, 19.5, 10.5, 12)) set(x, y, x >= 24 ? C.s : C.S);
          if (inE(x, y, 6.8, 19, 2.6, 3.2) || inE(x, y, 29.2, 19, 2.6, 3.2)) set(x, y, x < 18 ? C.S : C.s);
        }
      }
      set(6, 19, C.s); set(29, 19, C.s);
      for (let y = 15; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const face = inE(x, y, 18, 19.5, 10.5, 12);
          const chin = inE(x, y, 18, 26.6, 8.6, 5.6);
          if ((face && (y >= 24 || ((x <= 8 || x >= 28) && y >= 16))) || chin) {
            set(x, y, (x * 5 + y * 3) % 9 === 0 ? C.b : C.B);
          }
        }
      }
      for (let x = 13; x <= 23; x++) set(x, 22, C.B);
      for (let x = 14; x <= 22; x++) set(x, 23, C.B);
      for (let x = 15; x <= 21; x++) set(x, 25, C.M);
      set(14, 24, C.M); set(22, 24, C.M);
      set(19, 18, C.s); set(19, 19, C.s); set(19, 20, C.s); set(16, 21, C.s); set(20, 21, C.s);

      if (blink) {
        for (let x = 11; x <= 14; x++) set(x, 18, C.s);
        for (let x = 21; x <= 24; x++) set(x, 18, C.s);
      } else {
        for (let y = 17; y <= 18; y++) {
          for (let x = 11; x <= 14; x++) set(x, y, C.E);
          for (let x = 21; x <= 24; x++) set(x, y, C.E);
        }
        for (let y = 17; y <= 18; y++) {
          set(13, y, C.P); set(14, y, C.P); set(21, y, C.P); set(22, y, C.P);
        }
      }
      [[10, 15], [11, 14], [12, 14], [13, 14], [14, 15], [21, 15], [22, 14], [23, 14], [24, 14], [25, 15]].forEach((q) => {
        set(q[0], q[1], C.B);
      });

      const curls = [
        [7, 9.5, 4], [11.5, 5, 4.4], [17, 3.4, 4.6], [23, 3.8, 4.6],
        [28.5, 7.5, 4.2], [30.2, 11.5, 3], [5.6, 12.5, 3], [12, 8.5, 3.8],
        [24, 8.5, 3.8], [18, 6.5, 4], [6.6, 14.5, 2.2], [29.4, 14.5, 2.2]
      ];
      const fringe = [[11, 11.5, 2.4], [15.5, 11.8, 2.4], [20.5, 11.8, 2.4], [25, 11.5, 2.4]];

      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          let hair = inE(x, y, 18, 8, 13, 7);
          curls.concat(fringe).forEach((c) => {
            if (inE(x, y, c[0], c[1], c[2], c[2])) hair = true;
          });
          if (hair) set(x, y, C.H);
        }
      }
      curls.forEach((c) => {
        set(Math.round(c[0] - 1), Math.round(c[1] - c[2] + 1.6), C.h);
        set(Math.round(c[0]), Math.round(c[1] - c[2] + 1.6), C.h);
      });
      return { w, h, m };
    }

    function headSide() {
      const w = 34, h = 32;
      const m: Record<number, string> = {};
      function set(x: number, y: number, c: string) {
        if (x >= 0 && y >= 0 && x < w && y < h) m[y * w + x] = c;
      }
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          if (inE(x, y, 19, 13, 12, 11)) set(x, y, C.H);
          if (inE(x, y, 11.5, 20, 8.6, 11)) set(x, y, x >= 16 ? C.s : C.S);
        }
      }
      for (let y = 18; y <= 21; y++) { set(2, y, C.S); set(3, y, C.S); }
      set(2, 21, C.s); set(3, 21, C.s);
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) if (inE(x, y, 19.5, 19, 2.7, 3.3)) set(x, y, C.S);
      }
      set(19, 19, C.s); set(19, 20, C.s);
      for (let y = 15; y < h; y++) {
        for (let x = 0; x < w; x++) {
          const face = inE(x, y, 11.5, 20, 8.6, 11);
          const chin = inE(x, y, 11.5, 26, 8.2, 5.6);
          const jaw = x >= 12 && x <= 21 && y >= 22 && y <= 28 && inE(x, y, 15, 22, 9, 8);
          if ((face && y >= 23) || chin || jaw) set(x, y, (x * 5 + y * 3) % 9 === 0 ? C.b : C.B);
        }
      }
      for (let x = 3; x <= 10; x++) set(x, 22, C.B);
      for (let x = 4; x <= 8; x++) set(x, 25, C.M);
      for (let y = 17; y <= 18; y++) {
        for (let x = 5; x <= 8; x++) set(x, y, C.E);
        set(5, y, C.P); set(6, y, C.P);
      }
      for (let x = 4; x <= 9; x++) set(x, 15, C.B);
      const curls = [
        [9, 6, 4.2], [14.5, 3, 4.4], [21, 2.8, 4.6], [27, 5.5, 4.6],
        [30.5, 11.5, 4.2], [30, 17.5, 3.6], [26, 21, 3], [6, 10, 3.2], [11, 10.5, 2.6]
      ];
      for (let y = 0; y < h; y++) {
        for (let x = 0; x < w; x++) {
          curls.forEach((c) => {
            if (inE(x, y, c[0], c[1], c[2], c[2])) set(x, y, C.H);
          });
        }
      }
      curls.forEach((c) => {
        set(Math.round(c[0] - 1), Math.round(c[1] - c[2] + 1.6), C.h);
        set(Math.round(c[0]), Math.round(c[1] - c[2] + 1.6), C.h);
      });
      return { w, h, m };
    }

    const HF = headFront(0), HB = headFront(1), HS = headSide();

    function stamp(hd: { w: number; h: number; m: Record<number, string> }, x0: number, y0: number, flip?: number) {
      for (const k in hd.m) {
        const ki = Number(k);
        const x = ki % hd.w;
        const y = (ki / hd.w) | 0;
        put(x0 + x, y0 + (flip ? hd.h - 1 - y : y), hd.m[ki]);
      }
    }

    function seg(a: number[], b: number[], t: number, fn: (u: number, v: number) => string | undefined) {
      const r = t / 2;
      const dx = b[0] - a[0], dy = b[1] - a[1];
      const L2 = dx * dx + dy * dy || 1;
      for (let y = Math.floor(Math.min(a[1], b[1]) - r); y <= Math.ceil(Math.max(a[1], b[1]) + r); y++) {
        for (let x = Math.floor(Math.min(a[0], b[0]) - r); x <= Math.ceil(Math.max(a[0], b[0]) + r); x++) {
          const px = x + 0.5 - a[0], py = y + 0.5 - a[1];
          const u = Math.max(0, Math.min(1, (px * dx + py * dy) / L2));
          const qx = px - u * dx, qy = py - u * dy;
          if (qx * qx + qy * qy <= r * r) {
            const v = (dx * py - dy * px) / Math.sqrt(L2) / r;
            const col = fn(u, v);
            if (col) put(x, y, col);
          }
        }
      }
    }

    function disc(p: number[], r: number, c: string, c2?: string) {
      for (let y = Math.floor(p[1] - r); y <= p[1] + r; y++) {
        for (let x = Math.floor(p[0] - r); x <= p[0] + r; x++) {
          if (inE(x, y, p[0], p[1], r, r)) put(x, y, c2 && x + 0.5 > p[0] + r * 0.35 ? c2 : c);
        }
      }
    }

    const skin = (_u: number, v: number) => (v > 0.45 ? C.s : C.S);
    const tee = (_u: number, v: number) => (v > 0.5 ? C.t : C.T);
    const jog = (_u: number, v: number) => (v > 0.45 ? C.j : C.J);

    function arm(sh: number[], el: number[], ha: number[], watch?: number, thin?: number) {
      seg(sh, el, thin ? 7.6 : 8.6, (u, v) => (u < 0.45 ? tee(u, v) : skin(u, v)));
      seg(el, ha, thin ? 6.4 : 7, (u, v) => (watch && u > 0.74 && u < 0.88 ? (u < 0.8 && v < -0.2 ? C.G : C.R) : skin(u, v)));
      disc(ha, 3.5, C.S, C.s);
    }

    function shoeF(f: number[]) {
      for (let y = -3; y <= 3; y++) {
        for (let x = -6; x <= 6; x++) if (inE(x, y, 0, 0, 6.2, 3.4)) put(f[0] + x, f[1] + y, y >= 2 ? C.O : C.X);
      }
    }

    function shoeS(f: number[]) {
      for (let y = -8; y <= 1; y++) {
        for (let x = -3; x <= 3; x++) put(f[0] + x, f[1] + y, y >= 0 ? C.O : C.X);
      }
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function figure(p: any, blink: boolean) {
      if (p.v === 's') {
        let ux = p.Hp[0] - p.S[0], uy = p.Hp[1] - p.S[1];
        const ul = Math.hypot(ux, uy);
        ux /= ul; uy /= ul;
        seg(p.Hp, p.k, 11, jog);
        seg(p.k, [p.f[0], p.f[1] - 5], 8.4, jog);
        shoeS(p.f);
        seg([p.S[0] + ux * 4, p.S[1] + uy * 4], [p.Hp[0] - ux * 4, p.Hp[1] - uy * 4], 16, tee);
        seg([p.Hp[0] - ux * 5, p.Hp[1] - uy * 5], p.Hp, 16, jog);
        seg([p.Hp[0] - ux * 6, p.Hp[1] - uy * 6], [p.Hp[0] - ux * 4.5, p.Hp[1] - uy * 4.5], 16, () => C.w);
        arm(p.S, p.e, p.h, 1, 1);
        stamp(HS, p.head[0], p.head[1]);
        return;
      }
      const dir = p.Hp[1] > p.S[1] ? 1 : -1;
      [[p.kl, p.fl, -6], [p.kr, p.fr, 6]].forEach((L) => {
        const hip = [p.Hp[0] + L[2], p.Hp[1]];
        seg(hip, L[0] as number[], 11, jog);
        seg(L[0] as number[], [(L[1] as number[])[0], (L[1] as number[])[1] - dir * 3], 9, jog);
        shoeF(L[1] as number[]);
      });
      for (let y = -7; y <= 4; y++) {
        for (let x = -12; x <= 11; x++) put(p.Hp[0] + x, p.Hp[1] + y * dir, y <= -6 ? C.w : x > 6 ? C.j : C.J);
      }
      seg([p.S[0], p.S[1] + dir * 10], [p.Hp[0], p.Hp[1] - dir * 8], 25, tee);
      seg([p.S[0] - 10, p.S[1] + dir * 2], p.sl, 8.6, tee);
      seg([p.S[0] + 10, p.S[1] + dir * 2], p.sr, 8.6, tee);
      for (let i = 0; i < 4; i++) {
        for (let j = -(4 - i); j <= 3 - i; j++) put(p.S[0] + j, p.S[1] + dir * (i + 1), C.S);
      }
      [[-4, 1], [-3, 2], [-2, 3], [-1, 4], [0, 4], [1, 3], [2, 2], [3, 1]].forEach((q) => {
        put(p.S[0] + q[0], p.S[1] + dir * (q[1] + 2), C.Y);
      });
      seg([p.S[0] - 0.5, p.S[1] - dir * 3], [p.S[0] - 0.5, p.S[1] + dir * 2], 9, skin);
      arm(p.sl, p.el, p.hl, 1);
      arm(p.sr, p.er, p.hr, 0);
      stamp(blink ? HB : HF, p.head[0], p.head[1], p.flip);
    }

    function outline() {
      const out = buf.slice(), K = C.K;
      for (let y = 0; y < GH; y++) {
        for (let x = 0; x < GW; x++) {
          if (buf[y * GW + x]) continue;
          for (let o = 0; o < 4; o++) {
            const X = x + [1, -1, 0, 0][o];
            const Y = y + [0, 0, 1, -1][o];
            if (X >= 0 && Y >= 0 && X < GW && Y < GH && buf[Y * GW + X]) {
              out[y * GW + x] = K;
              break;
            }
          }
        }
      }
      buf = out;
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const P: Record<string, any> = {
      stand: { v: 'f', head: [30, 24], S: [48, 58], Hp: [48, 78], sl: [36, 58], sr: [60, 58], el: [33, 68], er: [63, 68], hl: [33, 77], hr: [63, 77], kl: [42, 88], kr: [54, 88], fl: [42, 95], fr: [54, 95] },
      hang: { v: 'f', head: [30, 30], S: [48, 62], Hp: [48, 84], sl: [36, 62], sr: [60, 62], el: [29, 46], er: [67, 46], hl: [26, 31], hr: [70, 31], kl: [42, 91], kr: [54, 91], fl: [41, 95], fr: [55, 95] },
      top: { v: 'f', head: [30, 0], S: [48, 32], Hp: [48, 54], sl: [36, 32], sr: [60, 32], el: [17, 38], er: [79, 38], hl: [26, 31], hr: [70, 31], kl: [42, 64], kr: [54, 64], fl: [40, 72], fr: [56, 72] },
      pUp: { v: 's', head: [0, 40], S: [28, 64], Hp: [62, 71], e: [28, 78], h: [28, 92], k: [76, 80], f: [90, 95] },
      pDn: { v: 's', head: [0, 54], S: [28, 78], Hp: [62, 83], e: [39, 74], h: [28, 92], k: [76, 87], f: [90, 95] },
      hand: { v: 'f', flip: 1, head: [30, 63], S: [48, 70], Hp: [48, 48], sl: [26, 70], sr: [70, 70], el: [26, 82], er: [70, 82], hl: [26, 94], hr: [70, 94], kl: [44, 32], kr: [52, 32], fl: [44, 15], fr: [52, 15] }
    };

    const SEQ = [
      { a: 'stand', b: 'stand', reps: 1, ms: 1600, lbl: 'warming up' },
      { a: 'hang', b: 'top', reps: 3, ms: 1100, lbl: 'pull-ups', bar: 1 },
      { a: 'stand', b: 'stand', reps: 1, ms: 600, lbl: 'catching breath' },
      { a: 'pUp', b: 'pDn', reps: 3, ms: 1000, lbl: 'push-ups' },
      { a: 'hand', b: 'hand', reps: 1, ms: 3000, lbl: 'handstand', hold: 1 },
      { a: 'stand', b: 'stand', reps: 1, ms: 900, lbl: 'catching breath' }
    ];

    const total = SEQ.reduce((s, x) => s + x.reps * x.ms, 0);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function lerp(a: any, b: any, k: number) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const o: any = {};
      for (const q in a) {
        o[q] = Array.isArray(a[q]) ? [a[q][0] + (b[q][0] - a[q][0]) * k, a[q][1] + (b[q][1] - a[q][1]) * k] : a[q];
      }
      return o;
    }

    function renderFrame(t: number, idle: boolean) {
      if (!ctx || !lb) return;
      const m = idle ? 0 : t % total;
      let s = SEQ[0], acc = 0;
      for (let i = 0; i < SEQ.length; i++) {
        if (m < acc + SEQ[i].reps * SEQ[i].ms) {
          s = SEQ[i];
          break;
        }
        acc += SEQ[i].reps * SEQ[i].ms;
      }
      const local = m - acc;
      const rep = Math.floor(local / s.ms);
      const ph = (local % s.ms) / s.ms;
      const k = (1 - Math.cos(2 * Math.PI * ph)) / 2;
      const p = lerp(P[s.a], P[s.b], k);

      if (s.hold) {
        const sw = Math.sin(local / 430);
        ['kl', 'kr', 'Hp'].forEach((q) => { p[q] = [p[q][0] + sw * 1.2, p[q][1]]; });
        ['fl', 'fr'].forEach((q) => { p[q] = [p[q][0] + sw * 2.6, p[q][1]]; });
      }

      ctx.clearRect(0, 0, GW, GH);
      const bar = getComputedStyle(document.documentElement).getPropertyValue('--soft').trim() || '#8b8b94';

      if (!s.bar && s.a !== 'pUp') {
        ctx.fillStyle = 'rgba(0,0,0,.25)';
        ctx.beginPath();
        ctx.ellipse(48, GH - 1, 18, 2.6, 0, 0, 7);
        ctx.fill();
      }

      if (s.bar) {
        ctx.fillStyle = bar;
        ctx.fillRect(8, 28, 80, 4);
        ctx.fillRect(10, 28, 4, GH - 28);
        ctx.fillRect(82, 28, 4, GH - 28);
      }

      buf = new Array(GW * GH);
      figure(p, s.a === 'stand' && ((idle ? performance.now() : t) % 3600) < 150);
      outline();

      for (let y = 0; y < GH; y++) {
        for (let x = 0; x < GW; x++) {
          const c = buf[y * GW + x];
          if (c) {
            ctx.fillStyle = c;
            ctx.fillRect(x, y, 1, 1);
          }
        }
      }

      if (s.bar) {
        [p.hl, p.hr].forEach((h) => {
          ctx.fillStyle = bar;
          ctx.fillRect(h[0] - 6, 28, 12, 4);
          ctx.fillStyle = C.K;
          ctx.fillRect(h[0] - 4, 27, 8, 1);
          ctx.fillRect(h[0] - 4, 31, 8, 1);
          ctx.fillStyle = C.S;
          ctx.fillRect(h[0] - 3, 28, 6, 3);
        });
      }

      lb.classList.toggle('idle', !!idle);
      const txt = 'now: ' + s.lbl + (s.hold ? ' · hold' : /^(warming|catching)/.test(s.lbl) ? '' : ' · ' + (rep + (ph > 0.5 ? 1 : 0)));
      if (!idle && txt !== lb.textContent) {
        if (/pull-ups · [1-9]/.test(txt)) playSfx('jump');
        else if (/push-ups · [1-9]/.test(txt)) playSfx('thud');
        else if (/handstand/.test(txt)) playSfx('sparkle');
      }
      lb.textContent = txt;
    }

    renderFrame(0, true);

    let t0 = 0;
    let playing = false;
    let hovering = false;
    let once = false;
    let animId: number;

    const start = () => {
      if (!playing) {
        playing = true;
        setIsPlaying(true);
        t0 = performance.now();
      }
    };

    const enter = () => {
      hovering = true;
      start();
    };

    const leave = () => {
      hovering = false;
      if (!once) {
        playing = false;
        setIsPlaying(false);
      }
    };

    const tap = () => {
      once = true;
      start();
    };

    cv.addEventListener('pointerenter', enter);
    cv.addEventListener('pointerleave', leave);
    cv.addEventListener('click', tap);

    const caliWord = document.getElementById('caliWord');
    if (caliWord) {
      caliWord.addEventListener('pointerenter', enter);
      caliWord.addEventListener('pointerleave', leave);
      caliWord.addEventListener('click', tap);
    }

    function loop(now: number) {
      if (playing && once && !hovering && now - t0 >= total) {
        playing = false;
        once = false;
        setIsPlaying(false);
      }
      renderFrame(playing ? now - t0 : 0, !playing);
      animId = requestAnimationFrame(loop);
    }

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      cv.removeEventListener('pointerenter', enter);
      cv.removeEventListener('pointerleave', leave);
      cv.removeEventListener('click', tap);
      if (caliWord) {
        caliWord.removeEventListener('pointerenter', enter);
        caliWord.removeEventListener('pointerleave', leave);
        caliWord.removeEventListener('click', tap);
      }
    };
  }, []);

  return (
    <section id="about" data-ml-section="about">
      <div className="band stripes">
        <div className="col">
          <span className="dot tl" />
          <span className="dot tr" />
          <span className="dot bl" />
          <span className="dot br" />
          <div className="sec-head">
            <h2>About</h2>
          </div>
        </div>
      </div>

      <div className="col pad">
        <ul className="bullets">
          {portfolioData.bioBullets.map((bullet, idx) => {
            // Render text with highlights in bold
            let rendered: React.ReactNode = bullet.text;
            if (bullet.highlights && bullet.highlights.length > 0) {
              const regex = new RegExp(`(${bullet.highlights.map(h => h.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
              const parts = bullet.text.split(regex);
              rendered = parts.map((part, i) => {
                const isHighlight = bullet.highlights.some(h => h.toLowerCase() === part.toLowerCase());
                return isHighlight ? <b key={i}>{part}</b> : part;
              });
            }

            return (
              <li key={idx}>
                <span>{rendered}</span>
              </li>
            );
          })}
        </ul>

        {/* Pixel-art mascot canvas */}
        <div className="cali-wrapper" style={{ position: 'relative' }}>
          <canvas
            id="cali"
            ref={canvasRef}
            width="96"
            height="100"
            data-cursor-label="hover to watch a set"
            role="img"
            aria-label="Pixel-art mascot doing workout animations"
          />
          <span className={`cali-lbl ${!isPlaying ? 'idle' : ''}`} id="caliLbl" ref={labelRef} aria-hidden="true">
            now: warming up
          </span>
        </div>
      </div>
    </section>
  );
};
