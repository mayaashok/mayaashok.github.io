// Lassie.js — a wireframe "envelope library" view of LASSIE, the DISSCO GUI. An Object List on the
// left steps through objects; for each one, an envelope curve draws itself on a grid on the right
// while a playhead sweeps across. Drawn live on a 2D canvas. Everything is in this one file.
//
// Usage:   import Lassie from './Lassie';
//          <Lassie />
// It fills whatever box it is put in (16:9 if the box has no height of its own) and switches
// to a compact title bar and HUD when it is narrower than 360px.
// Props:   title   text in the window's title bar

import { useEffect, useRef, useState } from 'react';

export default function Lassie({ title = 'lassie — envelope library' }) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const nameRef = useRef(null);
  const [compact, setCompact] = useState(true);

  useEffect(() => {
    const ro = new ResizeObserver(([e]) => setCompact(e.contentRect.width < 360));
    ro.observe(rootRef.current);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    try {
      return startScene(canvasRef.current, {
        // write the readout directly so React doesn't re-render every frame
        onSelect: (name) => { if (nameRef.current) nameRef.current.textContent = name; },
      });
    } catch (err) {
      console.error('Lassie:', err);
    }
  }, []);

  const s = styles(compact);
  return (
    <div ref={rootRef} style={s.root}>
      <div style={s.bar}>
        <i style={s.dot('#628144')} /><i style={s.dot('#62b154')} /><i style={s.dot('#5fbf8c')} />
        <span style={s.title}>{title}</span>
      </div>
      <div style={s.view}>
        <canvas ref={canvasRef} style={s.canvas} role="img"
          aria-label="DISSCO's LASSIE interface: an object list beside an envelope editor drawing a curve" />
        <div style={{ ...s.hud, right: s.inset }}><b style={s.hudB}>LASSIE</b> · <b ref={nameRef} style={s.hudB}>env_01</b></div>
      </div>
    </div>
  );
}

const mono = 'ui-monospace, Menlo, Consolas, monospace';
const styles = (c) => ({
  inset: c ? 4 : 10,
  root: { width: '100%', height: '100%', aspectRatio: '16 / 9', display: 'flex', flexDirection: 'column',
          borderRadius: c ? 8 : 10, overflow: 'hidden', background: '#050a08',
          border: '1px solid #1f3329', boxSizing: 'border-box' },
  bar: { height: c ? 14 : 28, flexShrink: 0, display: 'flex', alignItems: 'center', gap: c ? 4 : 7,
         padding: c ? '0 6px' : '0 12px', background: '#16221d', borderBottom: '1px solid #24372e' },
  dot: (col) => ({ width: c ? 5 : 10, height: c ? 5 : 10, borderRadius: '50%', background: col, display: 'block' }),
  title: { marginLeft: c ? 3 : 8, font: `${c ? 8 : 12}px ${mono}`, color: '#8fc4a5',
           whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  view: { position: 'relative', flex: 1, minHeight: 0 },
  canvas: { position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' },
  hud: { position: 'absolute', top: c ? 4 : 10, padding: c ? '1px 4px' : '3px 8px', borderRadius: 3,
         background: 'rgba(5, 12, 9, 0.6)', font: `${c ? 8 : 12}px/1.3 ${mono}`, color: '#9fe0b6',
         pointerEvents: 'none', whiteSpace: 'nowrap' },
  hudB: { color: '#e3ffec', fontWeight: 600 },
});

// =====================================================================================
// The scene. startScene(canvas, { onSelect }) starts it and returns a cleanup function.
// =====================================================================================

const STEP = 1.6;                                   // seconds spent on each selected object
// the Object List: folders and how many objects each holds (LASSIE groups objects by type)
const FOLDERS = [['Events', 4], ['Spectrums', 2], ['Envelopes', 3], ['Notes', 2]];
const ROWS = [];
for (const [name, n] of FOLDERS) {
  ROWS.push({ label: name, depth: 0 });
  for (let i = 0; i < n; i++) ROWS.push({ label: `${name.slice(0, 3).toLowerCase()}_0${i + 1}`, depth: 1 });
}
const ITEMS = ROWS.map((r, i) => i).filter((i) => ROWS[i].depth === 1);

const hash = (k) => { const x = Math.sin(k * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const rgba = (rgb, a) => `rgba(${rgb},${clamp(a, 0, 1).toFixed(3)})`;
const DIM = '47,154,110', MID = '95,191,140', HI = '159,224,182', WHITE = '227,255,236';

// an attack / decay / sustain / release shape, slightly different for every object
const envelopeFor = (seed) => [
  [0, 0],
  [0.08 + 0.06 * hash(seed), 1],
  [0.3 + 0.1 * hash(seed + 1), 0.55 + 0.2 * hash(seed + 2)],
  [0.72, 0.45 + 0.2 * hash(seed + 3)],
  [1, 0],
];
const envelopeAt = (pts, x) => {
  let k = 0;
  while (k < pts.length - 2 && x > pts[k + 1][0]) k++;
  const a = pts[k], b = pts[k + 1], u = (x - a[0]) / (b[0] - a[0]);
  const shaped = k === 1 ? 1 - (1 - u) * (1 - u) : u;       // decay eases out, the rest is linear
  return a[1] + (b[1] - a[1]) * shaped;
};

function startScene(canvas, { onSelect } = {}) {
  const g = canvas.getContext('2d');
  if (!g) return () => {};
  let lastSel = -1;

  function draw(t) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = canvas.clientWidth, H = canvas.clientHeight;
    if (!W || !H) return;
    if (canvas.width !== Math.round(W * dpr) || canvas.height !== Math.round(H * dpr)) {
      canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
    }
    g.setTransform(dpr, 0, 0, dpr, 0, 0);
    const small = W < 360;
    const line = (x0, y0, x1, y1) => { g.beginPath(); g.moveTo(x0, y0); g.lineTo(x1, y1); g.stroke(); };

    g.fillStyle = '#050a08';
    g.fillRect(0, 0, W, H);

    // ---- Object List panel
    const listW = W * 0.3, rowH = small ? H / 16 : Math.min(15, H / 15), pad = small ? 4 : 10;
    g.fillStyle = 'rgba(22, 34, 29, 0.9)';
    g.fillRect(0, 0, listW, H);
    g.strokeStyle = rgba(DIM, 0.6); g.lineWidth = 1;
    line(listW, 0, listW, H);

    const selIndex = Math.floor(t / STEP) % ITEMS.length;
    const sel = ITEMS[selIndex];
    g.font = `${small ? 5 : 10}px ${mono}`;
    g.textBaseline = 'middle';
    let y = small ? rowH * 1.6 : 20;
    ROWS.forEach((r, i) => {
      const isSel = i === sel, x = pad + r.depth * (small ? 5 : 12);
      if (isSel) { g.fillStyle = 'rgba(95, 191, 140, 0.25)'; g.fillRect(0, y - rowH / 2, listW, rowH); }
      if (small) {
        // too small for readable text: draw each row as a short bar instead
        g.fillStyle = rgba(r.depth ? (isSel ? WHITE : MID) : HI, r.depth ? 0.8 : 0.95);
        g.fillRect(x, y - 1, (r.depth ? 18 : 24) * (0.7 + 0.3 * hash(i)) * (W / 200), 2);
      } else {
        g.fillStyle = r.depth ? (isSel ? '#e3ffec' : '#80bf97') : '#9fe0b6';
        g.fillText((r.depth ? '' : '▾ ') + r.label, x, y);
      }
      y += rowH;
    });

    // ---- envelope editor
    const ex = listW + (small ? 8 : 20), ew = W - ex - (small ? 8 : 20);
    const ey = H * (small ? 0.28 : 0.2), eh = H * 0.62;
    g.strokeStyle = rgba(DIM, 0.3); g.lineWidth = 1;
    for (let i = 0; i <= 8; i++) { const x = ex + i * ew / 8; line(x, ey, x, ey + eh); }
    for (let i = 0; i <= 4; i++) { const yy = ey + i * eh / 4; line(ex, yy, ex + ew, yy); }

    const pts = envelopeFor(sel * 3);
    const PX = (p) => [ex + p[0] * ew, ey + eh - p[1] * eh];
    const prog = clamp((t % STEP) / (STEP * 0.7), 0, 1);       // the curve draws itself, then holds

    // faint fill under the drawn part, then the curve
    const curve = [];
    for (let x = 0; x <= prog + 1e-9; x += 0.005) curve.push(PX([x, envelopeAt(pts, x)]));
    if (curve.length > 1) {
      g.fillStyle = 'rgba(159, 224, 182, 0.10)';
      g.beginPath(); g.moveTo(curve[0][0], ey + eh);
      for (const q of curve) g.lineTo(q[0], q[1]);
      g.lineTo(curve[curve.length - 1][0], ey + eh); g.closePath(); g.fill();

      g.strokeStyle = rgba(WHITE, 0.95); g.lineWidth = small ? 1.1 : 1.8;
      g.beginPath(); curve.forEach((q, i) => (i ? g.lineTo(q[0], q[1]) : g.moveTo(q[0], q[1]))); g.stroke();
    }

    // control points appear as the curve reaches them
    g.lineWidth = 1;
    for (const p of pts) if (p[0] <= prog) {
      const q = PX(p);
      g.fillStyle = '#e3ffec'; g.strokeStyle = '#2f9a6e';
      g.beginPath(); g.arc(q[0], q[1], small ? 1.6 : 3.2, 0, Math.PI * 2); g.fill(); g.stroke();
    }

    // playhead
    const ph = ex + ((t * 0.35) % 1) * ew;
    g.strokeStyle = rgba(HI, 0.5);
    line(ph, ey - 4, ph, ey + eh + 4);

    if (onSelect && sel !== lastSel) { lastSel = sel; onSelect(ROWS[sel].label); }
  }

  // animate only while on screen; one still frame for reduced motion
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const t0 = performance.now();
  const now = () => (reduceMotion ? 2 * STEP + 1.4 : 3 + (performance.now() - t0) / 1000);
  let visible = false, raf = 0;
  const loop = () => { draw(now()); raf = visible && !reduceMotion ? requestAnimationFrame(loop) : 0; };
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !raf && !reduceMotion) raf = requestAnimationFrame(loop);
  });
  io.observe(canvas);
  const ro = new ResizeObserver(() => draw(now()));
  ro.observe(canvas);
  draw(now());

  return () => {
    cancelAnimationFrame(raf);
    io.disconnect(); ro.disconnect();
  };
}
