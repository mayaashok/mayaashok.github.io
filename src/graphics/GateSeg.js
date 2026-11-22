// GateSeg.js — a browser-window "mask view" of a drone flying through racing gates while a
// segmentation model picks out the next gate (mask, edges, corner keypoints). Drawn live on a
// 2D canvas with a tiny hand-rolled perspective projection. Everything is in this one file.
//
// Usage:   import GateSeg from './GateSeg';
//          <GateSeg />
// It fills whatever box it is put in (16:9 if the box has no height of its own) and switches
// to a compact title bar and HUD when it is narrower than 360px.
// Props:   title   text in the window's title bar

import { useEffect, useRef, useState } from 'react';

export default function GateSeg({ title = 'gate_seg — mask view' }) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const iouRef = useRef(null);
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
        onIoU: (v) => { if (iouRef.current) iouRef.current.textContent = v.toFixed(2); },
      });
    } catch (err) {
      console.error('GateSeg:', err);
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
          aria-label="Drone flying through racing gates while a model segments the next gate and marks its corners" />
        <div style={{ ...s.hud, left: s.inset }}><b style={s.hudB}>SEG</b> · gate</div>
        <div style={{ ...s.hud, right: s.inset }}>IoU <b ref={iouRef} style={s.hudB}>-.--</b></div>
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
// The scene. startScene(canvas, { onIoU }) starts it and returns a cleanup function.
// World units are metres: x right, y up, z forward (the way the drone flies).
// =====================================================================================

const GAP = 14;                 // distance between gates
const OUT = 1.3, IN = 0.8;      // half-size of the gate's outer edge and of its opening
const SPEED = 6;                // drone speed, m/s
const FAR = 60;                 // fog / draw distance

// deterministic "random" gate placement, so the course is the same every time
const hash = (k) => { const x = Math.sin(k * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
const gateCenter = (k) => [(hash(k) - 0.5) * 5, 1.7 + hash(k + 50) * 0.8];
const smooth = (u) => u * u * (3 - 2 * u);
// the flight path: eases from one gate's centre to the next, so the drone threads every gate
const pathAt = (z) => {
  const k = Math.floor(z / GAP), u = smooth(z / GAP - k);
  const a = gateCenter(k), b = gateCenter(k + 1);
  return [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u];
};
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const rgba = (rgb, a) => `rgba(${rgb},${clamp(a, 0, 1).toFixed(3)})`;
const GRID = '47,154,110', LIGHT = '217,242,180', GATE = '95,191,140', MASK = '159,224,182',
      EDGE = '159,224,182', CORNER = '227,255,236', WINDOW = '143,196,165';

function startScene(canvas, { onIoU } = {}) {
  const g = canvas.getContext('2d');
  if (!g) return () => {};

  let mouseX = 0, camShift = 0;
  const hoverTarget = canvas.parentElement;
  const onMove = (e) => { const r = canvas.getBoundingClientRect(); mouseX = (e.clientX - r.left) / r.width - 0.5; };
  const onLeave = () => { mouseX = 0; };
  hoverTarget.addEventListener('pointermove', onMove);
  hoverTarget.addEventListener('pointerleave', onLeave);

  function draw(t) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = Math.round(canvas.clientWidth * dpr), H = Math.round(canvas.clientHeight * dpr);
    if (!W || !H) return;
    if (canvas.width !== W || canvas.height !== H) { canvas.width = W; canvas.height = H; }

    // drone on the path; chase camera a few metres behind and above, lagging the turns a little
    camShift += (mouseX * 1.5 - camShift) * 0.05;
    const dz = t * SPEED;
    const [dx, dyPath] = pathAt(dz);
    const dy = dyPath + 0.05 * Math.sin(t * 3);
    const camZ = dz - 4.2;
    const [cpx, cpy] = pathAt(camZ + 1.5);
    const cam = [cpx * 0.85 + camShift, cpy + 0.9, camZ];
    const f = W * 0.62, hy = H * 0.5, NEAR = 0.8;
    const P = (x, y, z) => { const Z = z - cam[2]; return [W / 2 + (x - cam[0]) / Z * f, hy - (y - cam[1]) / Z * f, Z]; };
    const fog = (Z) => clamp(1 - Z / FAR, 0, 1);
    const lw = Math.max(1, W / 600);
    const seg = (a, b) => { g.beginPath(); g.moveTo(a[0], a[1]); g.lineTo(b[0], b[1]); g.stroke(); };

    g.fillStyle = '#050a08';
    g.fillRect(0, 0, W, H);
    g.setLineDash([]);

    // ---- warehouse floor: a grid that scrolls under us
    g.lineWidth = lw;
    const zStart = cam[2] + NEAR, zEnd = cam[2] + FAR;
    for (let z = Math.floor(zStart / 4) * 4; z < zEnd; z += 4) {
      const z0 = Math.max(z, zStart), a = fog(z0 - cam[2]);
      g.strokeStyle = rgba(GRID, 0.32 * a);
      for (let x = -14; x <= 14; x += 2) seg(P(x, 0, z0), P(x, 0, z + 4));
      if (z >= zStart) seg(P(-14, 0, z), P(14, 0, z));
    }

    // ---- ceiling light bars
    g.lineWidth = lw * 2;
    for (let z = Math.ceil(zStart / 8) * 8; z < zEnd; z += 8) {
      g.strokeStyle = rgba(LIGHT, 0.55 * fog(z - cam[2]));
      for (const x of [-5, 0, 5]) seg(P(x - 0.8, 7, z), P(x + 0.8, 7, z));
    }

    // ---- gates, far to near; the drone is drawn in between so it really flies through them
    const target = Math.floor(dz / GAP) + 1;
    const kNear = Math.ceil(zStart / GAP), kFar = Math.floor(zEnd / GAP);
    const ahead = [], behind = [];
    for (let k = kFar; k >= kNear; k--) (k * GAP > dz ? ahead : behind).push(k);

    const drawGate = (k) => {
      const z = k * GAP, [cx, cy] = gateCenter(k), Z = z - cam[2], a = fog(Z);
      const sq = (h) => [[cx - h, cy + h], [cx + h, cy + h], [cx + h, cy - h], [cx - h, cy - h]];
      const outer = sq(OUT), inner = sq(IN);
      const px = (p) => P(p[0], p[1], z);

      // legs down to the floor
      g.lineWidth = lw;
      g.strokeStyle = rgba(GATE, 0.35 * a);
      for (const s of [-1, 1]) seg(P(cx + s * OUT * 0.7, cy - OUT, z), P(cx + s * OUT * 0.7, 0, z));

      // how "detected" this gate is: only the next gate, fading in as it comes into range
      const detect = k === target ? clamp((GAP * 1.1 - (z - dz)) / 4, 0, 1) : 0;

      // plain gate frame
      g.lineWidth = Math.max(lw, Math.min(3 * dpr, 0.05 * f / Z));
      g.strokeStyle = rgba(GATE, (0.6 - 0.35 * detect) * a);
      for (const loop of [outer, inner]) {
        g.beginPath(); loop.forEach((p, i) => { const q = px(p); i ? g.lineTo(q[0], q[1]) : g.moveTo(q[0], q[1]); });
        g.closePath(); g.stroke();
      }
      if (!detect) return;

      // predicted mask: the frame (outer minus opening), wobbling slightly like a live prediction
      const jit = (p, i) => [p[0] + 0.05 * Math.sin(t * 9 + i * 1.7 + k), p[1] + 0.05 * Math.cos(t * 7.3 + i * 2.3 + k)];
      g.beginPath();
      for (const loop of [outer, inner]) {
        loop.map(jit).forEach((p, i) => { const q = px(p); i ? g.lineTo(q[0], q[1]) : g.moveTo(q[0], q[1]); });
        g.closePath();
      }
      g.fillStyle = rgba(MASK, (0.26 + 0.06 * Math.sin(t * 6)) * detect * a);
      g.fill('evenodd');

      // detected edges, running a little past each corner
      g.strokeStyle = rgba(EDGE, 0.95 * detect * a);
      g.lineWidth = Math.max(lw, Math.min(2.5 * dpr, 0.035 * f / Z));
      const ext = 0.18;
      for (const loop of [outer, inner]) for (let i = 0; i < 4; i++) {
        const p = loop[i], q = loop[(i + 1) % 4], ux = Math.sign(q[0] - p[0]), uy = Math.sign(q[1] - p[1]);
        seg(px([p[0] - ux * ext, p[1] - uy * ext]), px([q[0] + ux * ext, q[1] + uy * ext]));
      }

      // corner keypoints
      const r = clamp(0.085 * f / Z, 1.6 * dpr, 6 * dpr);
      g.fillStyle = rgba(CORNER, detect * a);
      g.strokeStyle = rgba(GRID, detect * a);
      g.lineWidth = lw;
      for (const p of [...outer, ...inner]) {
        const q = px(p); g.beginPath(); g.arc(q[0], q[1], r, 0, Math.PI * 2); g.fill(); g.stroke();
      }

      // dashed network window around the gate
      const m = OUT + 0.45, tl = px([cx - m, cy + m]), br = px([cx + m, cy - m]);
      g.setLineDash([4 * dpr, 3 * dpr]);
      g.strokeStyle = rgba(WINDOW, 0.6 * detect * a);
      g.strokeRect(tl[0], tl[1], br[0] - tl[0], br[1] - tl[1]);
      g.setLineDash([]);
    };

    ahead.forEach(drawGate);

    // ---- the drone: a small quadcopter seen from behind, banking into turns
    const [sx, sy, sZ] = P(dx, dy, dz);
    const S = f / sZ;                                       // pixels per metre at the drone
    const slope = pathAt(dz + 0.5)[0] - pathAt(dz - 0.5)[0];
    const roll = clamp(slope * 0.45, -0.45, 0.45);

    // soft shadow on the floor
    const sh = P(dx, 0, dz);
    g.fillStyle = 'rgba(47,154,110,0.18)';
    g.beginPath(); g.ellipse(sh[0], sh[1], 0.35 * S, 0.08 * S, 0, 0, Math.PI * 2); g.fill();

    g.save();
    g.translate(sx, sy);
    g.rotate(roll);
    const rotors = [[-0.24, -0.09, 0.1], [0.24, -0.09, 0.1], [-0.32, 0.05, 0.13], [0.32, 0.05, 0.13]];  // front pair is further away
    g.lineWidth = Math.max(lw, 0.025 * S);
    g.strokeStyle = '#8fc4a5';
    for (const [x, y] of rotors) seg([0, 0], [x * S, y * S]);
    rotors.forEach(([x, y, rr], i) => {
      const cxp = x * S, cyp = y * S, rx = rr * S, ry = rr * S * 0.3;
      g.fillStyle = 'rgba(143,196,165,0.16)';
      g.beginPath(); g.ellipse(cxp, cyp, rx, ry, 0, 0, Math.PI * 2); g.fill(); g.stroke();
      const ang = t * 40 + i * 1.3;                         // spinning blade
      g.strokeStyle = 'rgba(227,255,236,0.8)';
      seg([cxp - Math.cos(ang) * rx, cyp - Math.sin(ang) * ry], [cxp + Math.cos(ang) * rx, cyp + Math.sin(ang) * ry]);
      g.strokeStyle = '#8fc4a5';
    });
    const bw = 0.24 * S, bh = 0.1 * S;
    g.fillStyle = '#eef7f1';
    g.beginPath(); g.rect(-bw / 2, -bh / 2, bw, bh); g.fill();
    g.fillStyle = '#1d3a30';
    g.fillRect(-bw * 0.3, -bh * 0.2, bw * 0.6, bh * 0.35);   // battery strap
    g.fillStyle = '#c4443a';                                 // tail light, like the car's in GmSil
    g.beginPath(); g.arc(0, bh * 0.25, Math.max(1, 0.022 * S), 0, Math.PI * 2); g.fill();
    g.restore();

    behind.forEach(drawGate);

    // IoU climbs as the next gate gets closer and bigger in the frame
    const closeness = clamp(1 - (target * GAP - dz) / GAP, 0, 1);
    if (onIoU) onIoU(0.84 + 0.09 * closeness + 0.012 * Math.sin(t * 5.3) + 0.008 * Math.sin(t * 11.1));
  }

  // animate only while on screen; one still frame for reduced motion
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const t0 = performance.now();
  const now = () => 3 + (performance.now() - t0) / 1000;
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
    hoverTarget.removeEventListener('pointermove', onMove);
    hoverTarget.removeEventListener('pointerleave', onLeave);
  };
}
