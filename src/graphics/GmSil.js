// GmSil.js — a browser-window "perception view" of an ACC software-in-the-loop
// simulation, drawn live with WebGL2. Everything is in this one file.
//
// Usage:   import GmSil from './GmSil';
//          <GmSil />
// Props:   title       text in the window's title bar
//          background  colour around the window (light by default)
//          maxWidth    largest width of the window in px

import { useEffect, useRef } from 'react';

export default function GmSil({
  title = 'acc_sil_sim — ipg movie',
  background = '#eef6f1',
  maxWidth = 600,
}) {
  const canvasRef = useRef(null);
  const gapRef = useRef(null);

  useEffect(() => {
    try {
      return startScene(canvasRef.current, {
        // write the readout directly so React doesn't re-render every frame
        onGap: (g) => { if (gapRef.current) gapRef.current.textContent = g.toFixed(1) + ' m'; },
      });
    } catch (err) {
      console.error('GmSil:', err);
    }
  }, []);

  return (
    <div style={styles.stage(background)}>
      <div style={styles.window(maxWidth)}>
        <div style={styles.bar}>
          <i style={styles.dot('#628144')} /><i style={styles.dot('#62b154')} /><i style={styles.dot('#5fbf8c')} />
          <span style={styles.title}>{title}</span>
        </div>
        <div style={styles.view}>
          <canvas ref={canvasRef} style={styles.canvas} role="img"
            aria-label="3D lidar simulation of a car using adaptive cruise control to follow the car ahead" />
          <div style={{ ...styles.hud, left: 10 }}><b style={styles.hudB}>SiL</b> · ACC</div>
          <div style={{ ...styles.hud, right: 10 }}>lead <b ref={gapRef} style={styles.hudB}>--.- m</b></div>
        </div>
      </div>
    </div>
  );
}

const mono = 'ui-monospace, Menlo, Consolas, monospace';
const styles = {
  stage: (bg) => ({ background: bg, padding: '28px 16px', display: 'flex', justifyContent: 'center' }),
  window: (w) => ({ width: '100%', maxWidth: w, borderRadius: 10, overflow: 'hidden', background: '#050a08',
                    boxShadow: '0 0 0 1px #1f3329, 0 14px 30px rgba(27, 39, 33, 0.28)' }),
  bar: { height: 28, display: 'flex', alignItems: 'center', gap: 7, padding: '0 12px',
         background: '#16221d', borderBottom: '1px solid #24372e' },
  dot: (c) => ({ width: 10, height: 10, borderRadius: '50%', background: c, display: 'block' }),
  title: { marginLeft: 8, font: `12px ${mono}`, color: '#8fc4a5', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' },
  view: { position: 'relative', aspectRatio: '16 / 9' },
  canvas: { position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block' },
  hud: { position: 'absolute', top: 10, padding: '3px 8px', borderRadius: 3, background: 'rgba(5, 12, 9, 0.6)',
         font: `12px/1.3 ${mono}`, color: '#9fe0b6', pointerEvents: 'none' },
  hudB: { color: '#e3ffec', fontWeight: 600 },
};

// =====================================================================================
// The WebGL scene. startScene(canvas, { onGap }) starts it and returns a cleanup function.
// =====================================================================================

// ================================================================ shaders
// One program draws the scene's points, lines and see-through faces. Each vertex knows how it moves:
//   aMove > 0  : scenery, slides toward the camera at aMove x road speed (wrapped per object, centre aObjZ)
//   aMove = 0  : attached to our car (lidar rings get the rotating sweep)
//   aMove = -1 : the lead car, pushed ahead by the current following gap
//   aMove = -2 : the gap marker, aObjZ in [0,1] = how far along the gap
const VS = `#version 300 es
in vec3 aPos; in vec4 aCol; in float aObjZ; in float aMove;
uniform mat4 uVP; uniform float uScroll, uGap, uFocal, uTime;
out vec4 vCol; out float vFog;
void main() {
  vec3 p = aPos;
  vec4 col = aCol;
  if (aMove > 0.0) {
    float c = aObjZ + uScroll * aMove;
    p.z += (mod(c + 100.0, 125.0) - 100.0) - aObjZ;
  } else if (aMove < -1.5) {
    p.z = -2.3 - aObjZ * uGap;
  } else if (aMove < -0.5) {
    p.z -= uGap;
  } else {
    float behind = mod(uTime * 2.0 - atan(p.x, -p.z), 6.2831853);
    float k = exp(-behind * 1.8);
    col.rgb += vec3(0.35, 0.75, 0.5) * k;
    col.a = min(1.0, col.a + 0.7 * k);
  }
  vec4 clip = uVP * vec4(p, 1.0);
  gl_Position = clip;
  gl_PointSize = clamp(0.11 * uFocal / clip.w, 1.0, 4.0);
  vCol = col;
  vFog = smoothstep(18.0, 90.0, clip.w);
}`;
const FS = `#version 300 es
precision highp float;
in vec4 vCol; in float vFog;
uniform bool uPoints;
out vec4 o;
void main() {
  float a = vCol.a;
  if (uPoints) {
    vec2 q = gl_PointCoord * 2.0 - 1.0;
    float r = dot(q, q);
    if (r > 1.0) discard;
    a *= 1.0 - smoothstep(0.3, 1.0, r);
  }
  o = vec4(vCol.rgb, a * (1.0 - vFog));     // additive blending: fading alpha fades into the dark
}`;
// Solid things (ground, our car) get simple lighting and fog.
const MVS = `#version 300 es
in vec3 aPos; in vec3 aNor; in vec3 aCol;
uniform mat4 uVP;
out vec3 vN; out vec3 vC; out float vFog;
void main() { vec4 c = uVP * vec4(aPos, 1.0); gl_Position = c; vN = aNor; vC = aCol; vFog = smoothstep(18.0, 90.0, c.w); }`;
const MFS = `#version 300 es
precision highp float;
in vec3 vN; in vec3 vC; in float vFog;
uniform vec3 uBg;
out vec4 o;
void main() {
  float d = max(dot(normalize(vN), normalize(vec3(0.4, 1.0, 0.5))), 0.0);
  o = vec4(mix(vC * (0.4 + 0.6 * d), uBg, vFog), 1.0);
}`;

// ================================================================ tiny matrix math (column-major, like the course)
const perspective = (fov, asp, n, f) => { const t = 1 / Math.tan(fov / 2);
  return [t/asp,0,0,0, 0,t,0,0, 0,0,(f+n)/(n-f),-1, 0,0,2*f*n/(n-f),0]; };
const sub = (a,b) => [a[0]-b[0],a[1]-b[1],a[2]-b[2]];
const cross = (a,b) => [a[1]*b[2]-a[2]*b[1], a[2]*b[0]-a[0]*b[2], a[0]*b[1]-a[1]*b[0]];
const norm = a => { const l = Math.hypot(...a); return a.map(v => v/l); };
const dot = (a,b) => a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
const lookAt = (e, t, up) => { const z = norm(sub(e,t)), x = norm(cross(up,z)), y = cross(z,x);
  return [x[0],y[0],z[0],0, x[1],y[1],z[1],0, x[2],y[2],z[2],0, -dot(x,e),-dot(y,e),-dot(z,e),1]; };
const mul = (a, b) => { const r = new Array(16).fill(0);
  for (let c = 0; c < 4; c++) for (let rr = 0; rr < 4; rr++) for (let k = 0; k < 4; k++) r[c*4+rr] += a[k*4+rr] * b[c*4+k];
  return r; };

// ================================================================ colours (site greens, dark)
const hex = (h, a = 1) => [...[1,3,5].map(i => parseInt(h.slice(i, i+2), 16) / 255), a];
const BG = hex('#050a08').slice(0, 3);
const byHeight = (y, a) => { const s = [[0,'#1f6b4f'],[0.35,'#2f9a6e'],[0.7,'#80bf97'],[1,'#d9f2b4']];
  const t = Math.min(Math.max(y / 15, 0), 1);
  for (let i = 1; i < s.length; i++) if (t <= s[i][0]) {
    const A = hex(s[i-1][1]), B = hex(s[i][1]), k = (t - s[i-1][0]) / (s[i][0] - s[i-1][0]);
    return [0,1,2].map(j => A[j] + (B[j] - A[j]) * k).concat(a); }
};

function startScene(canvas, { onGap } = {}) {
  // ================================================================ build the world
  let seed = 11; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };
  const R = (a, b) => a + (b - a) * rnd();
  const PTS = [], LIN = [], TRI = [], SOLID = [];         // first three: x y z r g b a objZ move
  const v = (arr, p, col, objZ, move) => arr.push(p[0], p[1], p[2], col[0], col[1], col[2], col[3], objZ, move);
  const pt = (p, col, objZ, move) => v(PTS, p, col, objZ, move);
  const ln = (a, b, col, objZ, move, objZb = objZ, moveB = move) => { v(LIN, a, col, objZ, move); v(LIN, b, col, objZb, moveB); };
  const quad = (a, b, c, d, col, objZ, move) => { for (const p of [a, b, c, a, c, d]) v(TRI, p, col, objZ, move); };

  // a see-through box with glowing edges (cars, people, buildings)
  const glassBox = (cx, y0, cz, w, h, l, fill, edge, move, faces = true) => {
    const X = [cx - w/2, cx + w/2], Y = [y0, y0 + h], Z = [cz - l/2, cz + l/2];
    const P = (i, j, k) => [X[i], Y[j], Z[k]];
    if (faces) {
      quad(P(0,1,0), P(1,1,0), P(1,1,1), P(0,1,1), fill, cz, move);               // top
      quad(P(0,0,0), P(0,1,0), P(0,1,1), P(0,0,1), fill, cz, move);               // sides
      quad(P(1,0,0), P(1,1,0), P(1,1,1), P(1,0,1), fill, cz, move);
      quad(P(0,0,1), P(1,0,1), P(1,1,1), P(0,1,1), fill, cz, move);               // back & front
      quad(P(0,0,0), P(1,0,0), P(1,1,0), P(0,1,0), fill, cz, move);
    }
    for (const j of [0,1]) for (const k of [0,1]) ln(P(0,j,k), P(1,j,k), edge, cz, move);
    for (const i of [0,1]) for (const k of [0,1]) ln(P(i,0,k), P(i,1,k), edge, cz, move);
    for (const i of [0,1]) for (const j of [0,1]) ln(P(i,j,0), P(i,j,1), edge, cz, move);
  };
  const car = (cx, cz, fill, edge, move) => {
    glassBox(cx, 0.25, cz, 1.9, 0.7, 4.5, fill, edge, move);
    glassBox(cx, 0.95, cz + 0.3, 1.55, 0.5, 2.3, fill, edge, move);
  };

  // road: painted lane dashes and edge lines as thin flat strips
  const strip = (x, z0, z1, w, col, move = 1) => quad([x-w/2,0.02,z0],[x+w/2,0.02,z0],[x+w/2,0.02,z1],[x-w/2,0.02,z1], col, (z0+z1)/2, move);
  for (let z = -100; z < 25; z += 6) { for (const x of [-1.8, 1.8]) strip(x, z, z + 3, 0.14, hex('#7fc79e', 0.5)); }
  for (let z = -100; z < 25; z += 5) { for (const x of [-5.4, 5.4]) strip(x, z, z + 5.02, 0.12, hex('#7fc79e', 0.35)); }

  // buildings: faint glass blocks with glowing outlines and a light sprinkle of lidar points
  for (const s of [-1, 1]) for (let z = -100; z < 25;) {
    const len = R(9, 18), h = R(6, 17), dep = R(6, 9), x0 = s * R(10.5, 12.5), cz = z + len / 2;
    glassBox(x0 + s * dep / 2, 0, cz, dep, h, len, byHeight(h * 0.6, 0.05), byHeight(h, 0.55), 1);
    for (let y = 2.2; y < h - 0.5; y += 2.6) ln([x0, y, z], [x0, y, z + len], byHeight(y, 0.22), cz, 1);   // floor lines
    for (let u = 0; u <= len; u += 0.9) for (let y = 0.3; y <= h; y += 0.9)
      if (rnd() > 0.78) pt([x0, y, z + u], byHeight(y, 0.8), cz, 1);
    z += len + R(3, 7);
  }
  // trees: sparse point crowns on a thin trunk
  for (const s of [-1, 1]) for (let z = -100 + R(0, 6); z < 25; z += R(8, 13)) {
    const x = s * R(7.4, 8.2), cy = R(3.4, 4.2), r = R(1.3, 1.8);
    ln([x, 0, z], [x, cy - 0.6, z], hex('#2f9a6e', 0.6), z, 1);
    for (let i = 0; i < 70; i++) {
      const a = R(0, 6.283), b = Math.acos(R(-1, 1)), rr = r * R(0.8, 1), y = cy + rr * Math.cos(b) * 0.85;
      pt([x + rr * Math.sin(b) * Math.cos(a), y, z + rr * Math.sin(b) * Math.sin(a)], byHeight(y + 2, 0.75), z, 1); }
  }
  // pedestrians on the sidewalks
  for (let i = 0; i < 9; i++) {
    const x = (i % 2 ? 1 : -1) * R(6.3, 7), z = R(-95, 20);
    glassBox(x, 0, z, 0.7, 1.8, 0.7, hex('#d9f2b4', 0.10), hex('#d9f2b4', 0.85), 1);
  }
  // other traffic: oncoming (left lane) passes fast, same-direction (right lane) we slowly overtake
  for (const [x, z, move] of [[-3.6, -30, 2.3], [-3.6, -82, 2.3], [3.6, -16, 0.45], [3.6, -64, 0.45], [-3.6, 2, 2.3]])
    car(x, z, hex('#3fa77a', 0.07), hex('#5fbf8c', 0.7), move);
  // the lead car we're following: brighter, plus the gap marker on the road
  car(0, -4.55, hex('#bfffd6', 0.13), hex('#e3ffec', 1), -1);
  for (let i = 0; i < 12; i += 2) ln([0, 0.06, 0], [0, 0.06, 0], hex('#e3ffec', 0.9), i / 12, -2, (i + 1) / 12, -2);
  for (const k of [0, 1]) ln([-0.5, 0.06, 0], [0.5, 0.06, 0], hex('#e3ffec', 0.9), k, -2);
  // lidar rings around our car: smooth arcs (line segments), not dots
  for (let r = 3.4; r < 42; r *= 1.13) {
    const n = Math.max(48, Math.floor(r * 10));
    for (let i = 0; i < n; i++) {
      const a0 = i / n * 6.283, a1 = (i + 1) / n * 6.283;
      const P = a => [r * Math.sin(a), 0.03, -r * Math.cos(a)];
      if (Math.abs(P(a0)[0]) < 9) ln(P(a0), P(a1), hex('#2f9a6e', 0.28 * (1 - r / 48)), 0, 0);
    }
  }

  // solid ground and our car
  const sq = (a, b, c, d, col) => { for (const p of [a, b, c, a, c, d]) SOLID.push(...p, 0, 1, 0, ...col.slice(0, 3)); };
  sq([-5.6, 0, -110], [5.6, 0, -110], [5.6, 0, 30], [-5.6, 0, 30], hex('#0e1a15'));      // road
  for (const s of [-1, 1]) sq([s*5.6, 0.01, -110], [s*10.5, 0.01, -110], [s*10.5, 0.01, 30], [s*5.6, 0.01, 30], hex('#13241d')); // sidewalks
  const box = (cx, cy, cz, sx, sy, sz, top, side) => {
    const faces = [[[0,1,0],top],[[0,-1,0],side],[[1,0,0],side],[[-1,0,0],side],[[0,0,1],side],[[0,0,-1],side]];
    for (const [n, col] of faces) {
      const [u, w] = n[1] ? [[1,0,0],[0,0,1]] : n[0] ? [[0,1,0],[0,0,1]] : [[1,0,0],[0,1,0]];
      const c = (a, b) => [0,1,2].map(i => [cx,cy,cz][i] + ([sx,sy,sz][i] / 2) * (n[i] + a * u[i] + b * w[i]));
      for (const [a, b] of [[-1,-1],[1,-1],[1,1],[-1,-1],[1,1],[-1,1]]) SOLID.push(...c(a, b), ...n, ...col.slice(0, 3));
    } };
  const body = hex('#eef7f1'), glass = hex('#1d3a30'), tyre = hex('#101a16'), tail = hex('#c4443a');
  box(0, 0.62, 0, 1.9, 0.7, 4.5, body, body);
  box(0, 1.22, 0.35, 1.6, 0.52, 2.3, body, glass);
  for (const x of [-0.85, 0.85]) for (const z of [-1.45, 1.45]) box(x, 0.32, z, 0.3, 0.64, 0.64, tyre, tyre);
  for (const x of [-0.7, 0.7]) box(x, 0.8, 2.26, 0.38, 0.12, 0.04, tail, tail);

  // ================================================================ GL setup
  const canvasGL = canvas.getContext('webgl2', { antialias: true, alpha: false });
  const gl = canvasGL;
  if (!gl) return () => {};
  const prog = (vs, fs) => { const p = gl.createProgram();
    for (const [t, s] of [[gl.VERTEX_SHADER, vs], [gl.FRAGMENT_SHADER, fs]]) {
      const sh = gl.createShader(t); gl.shaderSource(sh, s); gl.compileShader(sh);
      if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(sh));
      gl.attachShader(p, sh); }
    gl.linkProgram(p); return p; };
  const sProg = prog(VS, FS), mProg = prog(MVS, MFS);
  const vao = (program, data, layout) => {
    const va = gl.createVertexArray(); gl.bindVertexArray(va);
    gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer());
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(data), gl.STATIC_DRAW);
    const stride = layout.reduce((s, [, n]) => s + n, 0); let off = 0;
    for (const [name, n] of layout) { const loc = gl.getAttribLocation(program, name);
      gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, n, gl.FLOAT, false, stride * 4, off * 4); off += n; }
    return { va, count: data.length / stride }; };
  const L9 = [['aPos', 3], ['aCol', 4], ['aObjZ', 1], ['aMove', 1]];
  const points = vao(sProg, PTS, L9), lines = vao(sProg, LIN, L9), faces = vao(sProg, TRI, L9);
  const solid = vao(mProg, SOLID, [['aPos', 3], ['aNor', 3], ['aCol', 3]]);
  const U = n => gl.getUniformLocation(sProg, n);
  const u = { vp: U('uVP'), scroll: U('uScroll'), gap: U('uGap'), focal: U('uFocal'), time: U('uTime'), points: U('uPoints') };
  const mu = { vp: gl.getUniformLocation(mProg, 'uVP'), bg: gl.getUniformLocation(mProg, 'uBg') };

  // ================================================================ render loop
  const gapAt = t => 11 + 3.5 * Math.sin(t * 0.45) + 1.2 * Math.sin(t * 1.1 + 1);
  let mouseX = 0, camX = 0;
  const hoverTarget = canvas.parentElement;
  const onMove = e => { const r = canvas.getBoundingClientRect(); mouseX = (e.clientX - r.left) / r.width - 0.5; };
  const onLeave = () => { mouseX = 0; };
  hoverTarget.addEventListener('pointermove', onMove);
  hoverTarget.addEventListener('pointerleave', onLeave);

  function draw(t) {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.round(canvas.clientWidth * dpr), h = Math.round(canvas.clientHeight * dpr);
    if (!w || !h) return;
    if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; }
    gl.viewport(0, 0, w, h);
    gl.clearColor(...BG, 1); gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    camX += ((Math.sin(t * 0.13) * 1.6 + mouseX * 6) - camX) * 0.05;
    const fov = 0.8;
    const vp = mul(perspective(fov, w / h, 0.5, 200), lookAt([camX, 7, 12.5], [camX * 0.25, 0, -14], [0, 1, 0]));
    const gap = gapAt(t);

    // solid ground + our car, with depth
    gl.enable(gl.DEPTH_TEST); gl.depthMask(true); gl.disable(gl.BLEND);
    gl.useProgram(mProg); gl.uniformMatrix4fv(mu.vp, false, vp); gl.uniform3fv(mu.bg, BG);
    gl.bindVertexArray(solid.va); gl.drawArrays(gl.TRIANGLES, 0, solid.count);

    // glowing stuff, added on top (additive blending, no depth writes)
    gl.enable(gl.BLEND); gl.blendFunc(gl.SRC_ALPHA, gl.ONE); gl.depthMask(false);
    gl.useProgram(sProg);
    gl.uniformMatrix4fv(u.vp, false, vp);
    gl.uniform1f(u.scroll, t * 9); gl.uniform1f(u.gap, gap); gl.uniform1f(u.time, t);
    gl.uniform1f(u.focal, h / (2 * Math.tan(fov / 2)));
    gl.uniform1i(u.points, 0);
    gl.bindVertexArray(faces.va); gl.drawArrays(gl.TRIANGLES, 0, faces.count);
    gl.bindVertexArray(lines.va); gl.drawArrays(gl.LINES, 0, lines.count);
    gl.uniform1i(u.points, 1);
    gl.bindVertexArray(points.va); gl.drawArrays(gl.POINTS, 0, points.count);

    if (onGap) onGap(gap);
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