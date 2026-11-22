// Home.js — the home page's computer, drawn live in 3D with WebGL2: a green monitor with
// circuit traces on both sides and a keyboard that types. On load the traces draw outward;
// after that the keys press in bursts, and some presses send a pulse up the cable and out
// along a trace. The scene tilts gently toward the mouse. Everything is in this one file.
//
// Usage:   import HomeScene from './graphics/HomeScene';
//          <HomeScene />
// Props:   maxWidth   largest width in px (default 1100)
// The canvas is transparent, so it sits on whatever background the page has.
// If the browser has no WebGL2, it shows /homeAnimation.svg instead.

import { useEffect, useRef, useState } from 'react';

export default function HomeScene({ maxWidth = 1100 }) {
  const canvasRef = useRef(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    try {
      const stop = startScene(canvasRef.current);
      if (!stop) setFailed(true);
      return stop || undefined;
    } catch (err) {
      console.error('HomeScene:', err);
      setFailed(true);
    }
  }, []);

  return (
    <div style={{ width: '100%', maxWidth, margin: '0 auto' }}>
      {failed ? (
        <img src="/homeAnimation.svg" alt="A computer with a screen reading maya ashok, personal website"
             style={{ display: 'block', width: '100%' }} />
      ) : (
        <canvas ref={canvasRef} style={{ display: 'block', width: '100%', aspectRatio: '16 / 9' }} role="img"
          aria-label="3D computer: a monitor reading maya ashok, personal website, with circuit traces on each side and a keyboard typing" />
      )}
    </div>
  );
}

// =====================================================================================
// The scene. startScene(canvas) starts it and returns a cleanup function, or null without WebGL2.
// Units are roughly the original SVG's pixels: y up, origin at the centre of the monitor.
// =====================================================================================

const KEYBOARD_TILT = -0.7;          // radians the keyboard leans back; 0 = straight-on
const TYPING_PULSES = true;          // key presses send pulses up the cable and along the traces

// ================================================================ tiny matrix / vector math (column-major)
const perspective = (fov, asp, n, f) => { const t = 1 / Math.tan(fov / 2);
  return [t/asp,0,0,0, 0,t,0,0, 0,0,(f+n)/(n-f),-1, 0,0,2*f*n/(n-f),0]; };
const sub = (a,b) => [a[0]-b[0],a[1]-b[1],a[2]-b[2]];
const add = (a,b) => [a[0]+b[0],a[1]+b[1],a[2]+b[2]];
const scl = (a,s) => [a[0]*s,a[1]*s,a[2]*s];
const cross = (a,b) => [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];
const norm = a => { const l = Math.hypot(...a) || 1; return a.map(v => v/l); };
const dot = (a,b) => a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const lookAt = (e, t, up) => { const z = norm(sub(e,t)), x = norm(cross(up,z)), y = cross(z,x);
  return [x[0],y[0],z[0],0, x[1],y[1],z[1],0, x[2],y[2],z[2],0, -dot(x,e),-dot(y,e),-dot(z,e),1]; };
const mul = (a, b) => { const r = new Array(16).fill(0);
  for (let c = 0; c < 4; c++) for (let rr = 0; rr < 4; rr++) for (let k = 0; k < 4; k++) r[c*4+rr] += a[k*4+rr] * b[c*4+k];
  return r; };
const rotX = (p, a) => [p[0], p[1]*Math.cos(a) - p[2]*Math.sin(a), p[1]*Math.sin(a) + p[2]*Math.cos(a)];
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const hex = h => [1,3,5].map(i => parseInt(h.slice(i, i+2), 16) / 255);
const mix = (a, b, t) => a.map((v, i) => v + (b[i] - v) * t);
const easeOut = u => 1 - Math.pow(1 - u, 3);

// ================================================================ colours (from homeAnimation.svg)
const C = {
  monA: hex('#86c79e'), monB: hex('#44735b'), monSide: hex('#35594a'),
  kbA: hex('#a1eab8'), kbB: hex('#3b6854'), kbSide: hex('#2f4d3c'),
  key: hex('#ffffff'), keySide: hex('#c9d6cf'),
  cable: hex('#5f9c7c'), trace: hex('#80bf97'), pulse: hex('#f2fff6'), flash: hex('#d9f2b4'),
};

// ================================================================ layout
const MON = { w: 328, h: 231, r: 12, depth: 20 };
const SCREEN = { w: 270, h: 200, cy: 2.5 };
const KB = { w: 260, h: 123, r: 11, depth: 14, center: [0, -231, 24] };
// keys as [x0, x1] spans per row, in the SVG's coordinates (the keyboard's centre is at 515, 612.5)
const ROWS = [
  [579, [[406,438],[446,471],[478,503],[511,536],[543,568],[575,600],[607,625]]],
  [607.5, [[406,455],[463,489],[495,521],[527,553],[559,585],[592,625]]],
  [636, [[406,440],[448,587],[595,625]]],
];
const KEYS = [];
for (const [cy, spans] of ROWS) for (const [x0, x1] of spans) KEYS.push({ cx: (x0 + x1) / 2 - 515, cy: -(cy - 612.5), w: x1 - x0, h: 18 });
const SPACE_BAR = 14;
// circuit traces on the right side (mirrored on the left), starting at the monitor's edge
const TRACES = [
  [[0, 55], [18, 55], [40, 82], [92, 82]],
  [[0, 25], [76, 25]],
  [[0, -10], [46, -10]],
  [[0, -40], [30, -40], [52, -66], [102, -66]],
];
const ALL_TRACES = [];
for (const s of [1, -1]) for (const tr of TRACES) {
  const pts = tr.map(([x, y]) => [s * (MON.w / 2 + x), y]);
  const lens = [0];
  for (let i = 1; i < pts.length; i++) lens.push(lens[i-1] + Math.hypot(pts[i][0]-pts[i-1][0], pts[i][1]-pts[i-1][1]));
  ALL_TRACES.push({ pts, lens, total: lens[lens.length - 1] });
}
const traceAt = (tr, d) => {           // the point at distance d along a trace
  d = clamp(d, 0, tr.total);
  let i = 1; while (i < tr.pts.length - 1 && tr.lens[i] < d) i++;
  const a = tr.pts[i-1], b = tr.pts[i], u = (d - tr.lens[i-1]) / ((tr.lens[i] - tr.lens[i-1]) || 1);
  return [a[0] + (b[0] - a[0]) * u, a[1] + (b[1] - a[1]) * u];
};

// ================================================================ geometry
// vertex layout: pos3 nor3 col3 key1  (key = index of a keyboard key, or -1)
const STRIDE = 10;
const roundRect = (w, h, r, seg = 6) => {
  const pts = [], cs = [[w/2-r, h/2-r, 0], [-w/2+r, h/2-r, Math.PI/2], [-w/2+r, -h/2+r, Math.PI], [w/2-r, -h/2+r, 1.5*Math.PI]];
  for (const [cx, cy, a0] of cs) for (let i = 0; i <= seg; i++) { const a = a0 + i/seg * Math.PI/2; pts.push([cx + r*Math.cos(a), cy + r*Math.sin(a)]); }
  return pts;
};
// a rounded slab: front face coloured by front(x, y), sides and back by side
function slab(out, { w, h, r, z0, z1, front, side, xf, key = -1, cx = 0, cy = 0 }) {
  const pts = roundRect(w, h, r), n = pts.length;
  const P = (x, y, z) => xf.p([x + cx, y + cy, z]), N = v => xf.n(v);
  const put = (p, nn, c) => out.push(...p, ...nn, ...c, key);
  const fN = N([0,0,1]), bN = N([0,0,-1]);
  for (let i = 0; i < n; i++) {
    const a = pts[i], b = pts[(i + 1) % n];
    put(P(0, 0, z1), fN, front(0, 0)); put(P(a[0], a[1], z1), fN, front(a[0], a[1])); put(P(b[0], b[1], z1), fN, front(b[0], b[1]));
    put(P(0, 0, z0), bN, side); put(P(b[0], b[1], z0), bN, side); put(P(a[0], a[1], z0), bN, side);
    const sn = N(norm([b[1] - a[1], -(b[0] - a[0]), 0]));
    const q = [P(a[0], a[1], z0), P(b[0], b[1], z0), P(b[0], b[1], z1), P(a[0], a[1], z1)];
    for (const k of [0, 1, 2, 0, 2, 3]) put(q[k], sn, side);
  }
}
const makeXf = (rx, t) => ({ p: q => add(rotX(q, rx), t), n: q => rotX(q, rx) });

function buildStatic(tilt) {
  const V = [];
  slab(V, { w: MON.w, h: MON.h, r: MON.r, z0: -MON.depth/2, z1: MON.depth/2, side: C.monSide, xf: makeXf(0, [0, 0, 0]),
            front: (x, y) => mix(C.monA, C.monB, clamp(0.5 + x / MON.w * 0.35 - y / MON.h * 0.75, 0, 1)) });
  const kx = makeXf(tilt, KB.center);
  slab(V, { w: KB.w, h: KB.h, r: KB.r, z0: -KB.depth/2, z1: KB.depth/2, side: C.kbSide, xf: kx,
            front: (x, y) => mix(C.kbA, C.kbB, clamp(0.5 + x / KB.w * 0.45 - y / KB.h * 0.55, 0, 1)) });
  KEYS.forEach((k, i) => slab(V, { w: k.w, h: k.h, r: 4, z0: KB.depth/2 - 1, z1: KB.depth/2 + 4.5, cx: k.cx, cy: k.cy,
                                    side: C.keySide, front: () => C.key, xf: kx, key: i }));
  // cable: an S-curve tube from the bottom of the monitor to the back edge of the keyboard
  const top = add(rotX([0, KB.h / 2, 0], tilt), KB.center);
  const P0 = [-18, -MON.h / 2 + 2, 0], P3 = [24, top[1] - 2, top[2]];
  const P1 = [-18, (P0[1] + P3[1]) / 2 + 6, 0], P2 = [24, (P0[1] + P3[1]) / 2 - 6, P3[2] * 0.6];
  const bez = u => { const v = 1 - u; return [0,1,2].map(i => v*v*v*P0[i] + 3*v*v*u*P1[i] + 3*v*u*u*P2[i] + u*u*u*P3[i]); };
  const SEG = 28, SIDES = 10, R = 4.6, ring = [];
  for (let s = 0; s <= SEG; s++) {
    const u = s / SEG, p = bez(u), T = norm(sub(bez(Math.min(1, u + 0.01)), bez(Math.max(0, u - 0.01))));
    const n1 = norm(cross(T, [0, 0, 1])), n2 = cross(T, n1), r = [];
    for (let k = 0; k < SIDES; k++) {
      const a = k / SIDES * Math.PI * 2, nn = add(scl(n1, Math.cos(a)), scl(n2, Math.sin(a)));
      r.push([add(p, scl(nn, R)), nn]);
    }
    ring.push(r);
  }
  for (let s = 0; s < SEG; s++) for (let k = 0; k < SIDES; k++) {
    const a = ring[s][k], b = ring[s][(k+1)%SIDES], c = ring[s+1][(k+1)%SIDES], d = ring[s+1][k];
    for (const v of [a, b, c, a, c, d]) V.push(...v[0], ...v[1], ...C.cable, -1);
  }
  return { data: new Float32Array(V), bez, keyNormal: rotX([0, 0, 1], tilt) };
}

// ================================================================ shaders
const VS = `#version 300 es
in vec3 aPos; in vec3 aNor; in vec3 aCol; in float aKey;
uniform mat4 uVP; uniform float uPress[16]; uniform vec3 uKeyN;
out vec3 vN; out vec3 vC;
void main() {
  vec3 p = aPos;
  if (aKey > -0.5) p -= uKeyN * uPress[int(aKey + 0.5)];
  gl_Position = uVP * vec4(p, 1.0); vN = aNor; vC = aCol;
}`;
const FS = `#version 300 es
precision highp float;
in vec3 vN; in vec3 vC;
uniform vec3 uView;
out vec4 o;
void main() {
  vec3 n = normalize(vN), L = normalize(vec3(-0.35, 0.55, 1.0));
  float d = max(dot(n, L), 0.0);
  float s = pow(max(dot(n, normalize(L + uView)), 0.0), 60.0) * 0.10;
  o = vec4(vC * (0.52 + 0.52 * d) + s, 1.0);
}`;
const TVS = `#version 300 es
in vec3 aPos; in vec2 aUV; uniform mat4 uVP; out vec2 vUV;
void main() { gl_Position = uVP * vec4(aPos, 1.0); vUV = aUV; }`;
const TFS = `#version 300 es
precision highp float;
in vec2 vUV; uniform sampler2D uTex; out vec4 o;
void main() { o = vec4(texture(uTex, vUV).rgb, 1.0); }`;

function startScene(canvas) {
  const gl = canvas.getContext('webgl2', { antialias: true, alpha: true, premultipliedAlpha: true });
  if (!gl) return null;

  // ================================================================ GL setup
  const prog = (vs, fs) => { const p = gl.createProgram();
    for (const [t, s] of [[gl.VERTEX_SHADER, vs], [gl.FRAGMENT_SHADER, fs]]) {
      const sh = gl.createShader(t); gl.shaderSource(sh, s); gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh));
      gl.attachShader(p, sh); }
    gl.linkProgram(p); return p; };
  const sProg = prog(VS, FS), tProg = prog(TVS, TFS);
  const layout = (program, buf, attrs) => {
    const va = gl.createVertexArray(); gl.bindVertexArray(va); gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    const stride = attrs.reduce((s, [, n]) => s + n, 0); let off = 0;
    for (const [name, n] of attrs) { const loc = gl.getAttribLocation(program, name);
      gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, n, gl.FLOAT, false, stride * 4, off * 4); off += n; }
    return va; };
  const SATTR = [['aPos', 3], ['aNor', 3], ['aCol', 3], ['aKey', 1]];
  const staticBuf = gl.createBuffer(), dynBuf = gl.createBuffer(), scrBuf = gl.createBuffer();
  const staticVA = layout(sProg, staticBuf, SATTR), dynVA = layout(sProg, dynBuf, SATTR);
  const scrVA = layout(tProg, scrBuf, [['aPos', 3], ['aUV', 2]]);

  const scene = buildStatic(KEYBOARD_TILT);
  gl.bindBuffer(gl.ARRAY_BUFFER, staticBuf); gl.bufferData(gl.ARRAY_BUFFER, scene.data, gl.STATIC_DRAW);
  const staticCount = scene.data.length / STRIDE;

  { // screen quad, just in front of the monitor's face
    const x = SCREEN.w / 2, y0 = SCREEN.cy - SCREEN.h / 2, y1 = SCREEN.cy + SCREEN.h / 2, z = MON.depth / 2 + 0.4;
    const q = [[-x,y0,0,0],[x,y0,1,0],[x,y1,1,1],[-x,y0,0,0],[x,y1,1,1],[-x,y1,0,1]];
    gl.bindBuffer(gl.ARRAY_BUFFER, scrBuf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(q.flatMap(([a, b, u, v]) => [a, b, z, u, v])), gl.STATIC_DRAW);
  }

  // screen texture: a white screen with two lines of monospace text
  const tex = gl.createTexture();
  const drawScreenTexture = () => {
    const S = 4, c = document.createElement('canvas'); c.width = SCREEN.w * S; c.height = SCREEN.h * S;
    const g = c.getContext('2d');
    g.fillStyle = '#ffffff'; g.fillRect(0, 0, c.width, c.height);
    g.fillStyle = '#111111'; g.textAlign = 'center'; g.textBaseline = 'middle';
    g.font = `500 ${34 * S}px ui-monospace, Menlo, Consolas, monospace`;
    g.fillText('maya ashok', c.width / 2, 62 * S);
    g.font = `${18 * S}px ui-monospace, Menlo, Consolas, monospace`;
    g.fillText('{ personal website }', c.width / 2, 108 * S);
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, c);
    gl.generateMipmap(gl.TEXTURE_2D);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  };
  drawScreenTexture();

  const U = n => gl.getUniformLocation(sProg, n);
  const u = { vp: U('uVP'), press: U('uPress'), keyN: U('uKeyN'), view: U('uView') };
  const tu = { vp: gl.getUniformLocation(tProg, 'uVP'), tex: gl.getUniformLocation(tProg, 'uTex') };

  // ================================================================ animation state
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const introStart = reduceMotion ? -10 : 0;          // reduced motion: start with the traces drawn
  const lastPress = new Array(KEYS.length).fill(-10);
  let nextPress = 2.6, burstLeft = 0;
  const pulses = [];
  const flashAt = new Array(ALL_TRACES.length).fill(-10);
  const CABLE_T = 0.35, TRACE_T = 0.5;
  let mx = 0, my = 0, sx = 0, sy = 0;
  const onMove = e => { mx = e.clientX / window.innerWidth - 0.5; my = e.clientY / window.innerHeight - 0.5; };
  window.addEventListener('pointermove', onMove);

  function update(t) {
    if (reduceMotion) return;
    if (t - nextPress > 2) nextPress = t;                       // back from a paused / hidden tab
    while (t - introStart > 2.6 && t >= nextPress) {
      if (burstLeft <= 0) { burstLeft = 5 + Math.floor(Math.random() * 9); nextPress += 0.9 + Math.random() * 1.6; continue; }
      const k = Math.random() < 0.15 ? SPACE_BAR : Math.floor(Math.random() * KEYS.length);
      lastPress[k] = nextPress; burstLeft--;
      if (TYPING_PULSES && Math.random() < 0.4) pulses.push({ t0: nextPress, tr: Math.floor(Math.random() * ALL_TRACES.length) });
      nextPress += 0.08 + Math.random() * 0.14;
    }
    for (let i = pulses.length - 1; i >= 0; i--) {
      if (t - pulses[i].t0 >= CABLE_T + TRACE_T) { flashAt[pulses[i].tr] = pulses[i].t0 + CABLE_T + TRACE_T; pulses.splice(i, 1); }
    }
  }

  // flat shapes for the traces, dots and pulses, rebuilt every frame
  function dynamic(t) {
    const D = [], it = t - introStart;
    const put = (x, y, z, c) => D.push(x, y, z, 0, 0, 1, ...c, -1);
    const disk = (x, y, z, r, c, n = 20) => { for (let i = 0; i < n; i++) {
      const a0 = i / n * Math.PI * 2, a1 = (i + 1) / n * Math.PI * 2;
      put(x, y, z, c); put(x + r*Math.cos(a0), y + r*Math.sin(a0), z, c); put(x + r*Math.cos(a1), y + r*Math.sin(a1), z, c); } };
    const ribbon = (a, b, w, z, c) => {
      const dx = b[0]-a[0], dy = b[1]-a[1], l = Math.hypot(dx, dy) || 1, px = -dy/l*w/2, py = dx/l*w/2;
      const q = [[a[0]+px,a[1]+py],[b[0]+px,b[1]+py],[b[0]-px,b[1]-py],[a[0]-px,a[1]-py]];
      for (const k of [0,1,2,0,2,3]) put(q[k][0], q[k][1], z, c); };
    ALL_TRACES.forEach((tr, i) => {
      const grow = easeOut(clamp((it - 0.3 - (i % 4) * 0.18) / 1.6, 0, 1));
      const d = grow * tr.total;
      let prev = tr.pts[0];
      for (let j = 1; j < tr.pts.length; j++) {
        if (tr.lens[j-1] >= d) break;
        const end = tr.lens[j] <= d ? tr.pts[j] : traceAt(tr, d);
        ribbon(prev, end, 5, 0, C.trace);
        if (tr.lens[j] <= d && j < tr.pts.length - 1) disk(end[0], end[1], 0, 2.5, C.trace, 10);
        prev = end;
      }
      const tip = traceAt(tr, d), f = clamp(1 - (t - flashAt[i]) / 0.35, 0, 1);
      if (grow > 0) disk(tip[0], tip[1], 0.5, 5.6 * (1 + 0.55 * f), mix(C.trace, C.flash, f));
    });
    for (const p of pulses) {
      const age = t - p.t0;
      if (age < CABLE_T) {                                     // up the cable, keyboard to monitor
        const q = scene.bez(1 - age / CABLE_T);
        disk(q[0], q[1], q[2] + 5, 3.2, C.pulse, 12);
      } else {                                                 // then out along a trace
        const tr = ALL_TRACES[p.tr], q = traceAt(tr, (age - CABLE_T) / TRACE_T * tr.total);
        disk(q[0], q[1], 1, 3.2, C.pulse, 12);
      }
    }
    return new Float32Array(D);
  }

  // ================================================================ render
  function draw(t) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(canvas.clientWidth * dpr), h = Math.round(canvas.clientHeight * dpr);
    if (!w || !h) return;
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    update(t);
    gl.viewport(0, 0, w, h);
    gl.clearColor(0, 0, 0, 0); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    gl.enable(gl.DEPTH_TEST);

    // camera: slightly above, swaying a little, and turning toward the mouse
    sx += (mx - sx) * 0.06; sy += (my - sy) * 0.06;
    const fov = 0.5, tn = Math.tan(fov / 2), asp = w / h;
    const D = Math.max(560 / (2 * tn), 820 / (2 * tn * asp));
    const yaw = Math.sin(t * 0.35) * 0.08 + sx * 0.45, pitch = 0.16 + Math.sin(t * 0.27) * 0.03 + sy * 0.2;
    const target = [0, -70, 0];
    const eye = add(target, [D * Math.sin(yaw) * Math.cos(pitch), D * Math.sin(pitch), D * Math.cos(yaw) * Math.cos(pitch)]);
    const vp = mul(perspective(fov, asp, D * 0.4, D * 2.5), lookAt(eye, target, [0, 1, 0]));

    const press = new Float32Array(16);
    for (let k = 0; k < KEYS.length; k++) press[k] = 3.6 * clamp(1 - (t - lastPress[k]) / 0.16, 0, 1);

    gl.useProgram(sProg);
    gl.uniformMatrix4fv(u.vp, false, vp);
    gl.uniform1fv(u.press, press);
    gl.uniform3fv(u.keyN, scene.keyNormal);
    gl.uniform3fv(u.view, norm(sub(eye, target)));
    gl.bindVertexArray(staticVA); gl.drawArrays(gl.TRIANGLES, 0, staticCount);
    const dyn = dynamic(t);
    gl.bindBuffer(gl.ARRAY_BUFFER, dynBuf); gl.bufferData(gl.ARRAY_BUFFER, dyn, gl.DYNAMIC_DRAW);
    gl.bindVertexArray(dynVA); gl.drawArrays(gl.TRIANGLES, 0, dyn.length / STRIDE);

    gl.useProgram(tProg);
    gl.uniformMatrix4fv(tu.vp, false, vp);
    gl.activeTexture(gl.TEXTURE0); gl.bindTexture(gl.TEXTURE_2D, tex); gl.uniform1i(tu.tex, 0);
    gl.bindVertexArray(scrVA); gl.drawArrays(gl.TRIANGLES, 0, 6);
  }

  // animate only while on screen; one still frame for reduced motion
  const t0 = performance.now();
  const now = () => (performance.now() - t0) / 1000;
  let visible = false, raf = 0, disposed = false;
  const loop = () => { draw(now()); raf = visible && !reduceMotion ? requestAnimationFrame(loop) : 0; };
  const io = new IntersectionObserver(([e]) => {
    visible = e.isIntersecting;
    if (visible && !raf && !reduceMotion) raf = requestAnimationFrame(loop);
  });
  io.observe(canvas);
  const ro = new ResizeObserver(() => draw(now()));
  ro.observe(canvas);
  draw(now());
  // redraw the screen text once web fonts have settled
  if (document.fonts) document.fonts.ready.then(() => { if (!disposed) { drawScreenTexture(); draw(now()); } });

  return () => {
    disposed = true;
    cancelAnimationFrame(raf);
    io.disconnect(); ro.disconnect();
    window.removeEventListener('pointermove', onMove);
  };
}
