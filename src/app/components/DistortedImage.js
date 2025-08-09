'use client'

import { useEffect, useRef } from 'react'

const vertexSrc = `
attribute vec2 a_position;
varying vec2 v_uv;
void main(){
  v_uv = (a_position + 1.0) * 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`

const fragmentSrc = `
precision mediump float;
uniform sampler2D u_tex;
uniform vec2 u_res;
uniform vec2 u_texRes;
uniform vec2 u_mouse; // pixels
uniform float u_time;
uniform float u_amp; // 0..0.06
varying vec2 v_uv;

vec2 coverUV(vec2 uv, vec2 canvas, vec2 image){
  float ca = canvas.x / canvas.y;
  float ia = image.x / image.y;
  if (ca > ia) {
    float scale = ca / ia;
    uv.y = (uv.y - 0.5) / scale + 0.5;
  } else {
    float scale = ia / ca;
    uv.x = (uv.x - 0.5) / scale + 0.5;
  }
  return uv;
}

void main(){
  vec2 uv = v_uv;
  vec2 m = u_mouse / u_res;
  float d = distance(uv, m);
  float ripple = sin(40.0 * d - u_time * 2.5) * exp(-6.0 * d);
  vec2 dir = normalize(uv - m + 1e-6);
  uv += dir * ripple * u_amp;
  uv = coverUV(uv, u_res, u_texRes);
  vec4 color = texture2D(u_tex, uv);
  gl_FragColor = color;
}`

function createShader(gl, type, src) {
  const sh = gl.createShader(type)
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error(gl.getShaderInfoLog(sh))
  }
  return sh
}

function createProgram(gl, vs, fs) {
  const prog = gl.createProgram()
  gl.attachShader(prog, vs)
  gl.attachShader(prog, fs)
  gl.linkProgram(prog)
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
    console.error(gl.getProgramInfoLog(prog))
  }
  return prog
}

export default function DistortedImage({ src, className = '', dataThumb = false }) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const stateRef = useRef({ time: 0, amp: 0, targetAmp: 0, mouse: { x: 0, y: 0 } })
  const rafRef = useRef(0)

  useEffect(() => {
    const container = containerRef.current
    const canvas = canvasRef.current
    if (!container || !canvas) return

    const gl = canvas.getContext('webgl')
    if (!gl) return

    const vs = createShader(gl, gl.VERTEX_SHADER, vertexSrc)
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fragmentSrc)
    const program = createProgram(gl, vs, fs)
    gl.useProgram(program)

    const posLoc = gl.getAttribLocation(program, 'a_position')
    const buffer = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,
       1, -1,
      -1,  1,
      -1,  1,
       1, -1,
       1,  1,
    ]), gl.STATIC_DRAW)
    gl.enableVertexAttribArray(posLoc)
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0)

    const uTex = gl.getUniformLocation(program, 'u_tex')
    const uRes = gl.getUniformLocation(program, 'u_res')
    const uTexRes = gl.getUniformLocation(program, 'u_texRes')
    const uMouse = gl.getUniformLocation(program, 'u_mouse')
    const uTime = gl.getUniformLocation(program, 'u_time')
    const uAmp = gl.getUniformLocation(program, 'u_amp')

    const texture = gl.createTexture()
    gl.bindTexture(gl.TEXTURE_2D, texture)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR)
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR)

    const image = new Image()
    image.src = src
    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture)
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1)
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image)
      gl.uniform2f(uTexRes, image.width, image.height)
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = container.getBoundingClientRect()
      const w = Math.max(2, Math.floor(rect.width))
      const h = Math.max(2, Math.floor(rect.height))
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      canvas.style.width = w + 'px'
      canvas.style.height = h + 'px'
      gl.viewport(0, 0, canvas.width, canvas.height)
      gl.uniform2f(uRes, canvas.width, canvas.height)
    }
    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(container)

    function render(t) {
      const s = stateRef.current
      // lerp amplitude
      s.amp += (s.targetAmp - s.amp) * 0.12
      s.time = (t || 0) / 1000
      gl.uniform1f(uTime, s.time)
      gl.uniform1f(uAmp, s.amp)
      gl.uniform2f(uMouse, s.mouse.x, s.mouse.y)
      gl.uniform1i(uTex, 0)
      gl.drawArrays(gl.TRIANGLES, 0, 6)
      rafRef.current = requestAnimationFrame(render)
    }
    rafRef.current = requestAnimationFrame(render)

    function onEnter() { stateRef.current.targetAmp = 0.035 }
    function onLeave() { stateRef.current.targetAmp = 0.0 }
    function onMove(e) {
      const rect = canvas.getBoundingClientRect()
      stateRef.current.mouse.x = (e.clientX - rect.left) * (canvas.width / rect.width)
      stateRef.current.mouse.y = (e.clientY - rect.top) * (canvas.height / rect.height)
    }
    container.addEventListener('mouseenter', onEnter)
    container.addEventListener('mouseleave', onLeave)
    container.addEventListener('mousemove', onMove)

    return () => {
      cancelAnimationFrame(rafRef.current)
      container.removeEventListener('mouseenter', onEnter)
      container.removeEventListener('mouseleave', onLeave)
      container.removeEventListener('mousemove', onMove)
      ro.disconnect()
    }
  }, [src])

  return (
    <div ref={containerRef} className={className} {...(dataThumb ? { 'data-thumb': true } : {})}>
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  )
}


