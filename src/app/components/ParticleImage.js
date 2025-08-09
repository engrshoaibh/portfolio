'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ParticleImage({
  src,
  width = 400,
  height = 400,
  sampleGap = 3,
  particleSize = 1.4,
  className = '',
}) {
  const canvasRef = useRef(null)
  const containerRef = useRef(null)
  const particlesRef = useRef([])
  const mouseRef = useRef({ x: 0, y: 0, inside: false })
  const disperseRef = useRef(0)
  const rafRef = useRef(0)

  useLayoutEffect(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const ctx = canvas.getContext('2d')
    let disposed = false

    // Set canvas size (devicePixelRatio aware)
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    canvas.width = width * dpr
    canvas.height = height * dpr
    canvas.style.width = `${width}px`
    canvas.style.height = `${height}px`
    ctx.scale(dpr, dpr)

    // Prepare offscreen to sample image
    const off = document.createElement('canvas')
    const octx = off.getContext('2d')
    off.width = Math.floor(width * 0.7)
    off.height = Math.floor(height * 0.7)

    const image = new Image()
    image.src = src
    image.crossOrigin = 'anonymous'

    function distance(x1, y1, x2, y2) {
      const dx = x1 - x2
      const dy = y1 - y2
      return Math.sqrt(dx * dx + dy * dy)
    }

    function createParticles() {
      particlesRef.current = []
      octx.clearRect(0, 0, off.width, off.height)
      // cover
      const scale = Math.max(off.width / image.width, off.height / image.height)
      const iw = image.width * scale
      const ih = image.height * scale
      const ix = (off.width - iw) / 2
      const iy = (off.height - ih) / 2
      octx.drawImage(image, ix, iy, iw, ih)
      const { data } = octx.getImageData(0, 0, off.width, off.height)

      for (let y = 0; y < off.height; y += sampleGap) {
        for (let x = 0; x < off.width; x += sampleGap) {
          const idx = (y * off.width + x) * 4
          const r = data[idx]
          const g = data[idx + 1]
          const b = data[idx + 2]
          const a = data[idx + 3]
          if (a < 60) continue
          const brightness = (r + g + b) / 3
          if (brightness < 20) continue

          const tx = (x / off.width) * width
          const ty = (y / off.height) * height
          const angle = Math.random() * Math.PI * 2
          const radius = Math.random() * Math.min(width, height) * 0.5 + Math.min(width, height) * 0.25
          const sx = width / 2 + Math.cos(angle) * radius
          const sy = height / 2 + Math.sin(angle) * radius
          particlesRef.current.push({
            x: sx,
            y: sy,
            vx: 0,
            vy: 0,
            tx,
            ty,
            color: `rgb(${r},${g},${b})`,
            size: particleSize,
            seed: Math.random() * 1000,
          })
        }
      }
    }

    function render() {
      if (disposed) return
      const particles = particlesRef.current
      const mouse = mouseRef.current
      const disperse = disperseRef.current

      ctx.clearRect(0, 0, width, height)
      const centerX = width / 2
      const centerY = height / 2

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        // target with scroll-based dispersion
        const dx0 = p.tx - centerX
        const dy0 = p.ty - centerY
        const len = Math.sqrt(dx0 * dx0 + dy0 * dy0) || 1
        const ndx = dx0 / len
        const ndy = dy0 / len
          const disp = disperse * 60 // max offset higher for more separation
        const tpx = p.tx + ndx * disp
        const tpy = p.ty + ndy * disp

        // pointer push
        if (mouse.inside) {
          const d = distance(p.x, p.y, mouse.x, mouse.y)
          const radius = 80
          if (d < radius) {
            const force = (1 - d / radius) * 2.0
            const angle = Math.atan2(p.y - mouse.y, p.x - mouse.x)
            p.vx += Math.cos(angle) * force
            p.vy += Math.sin(angle) * force
          }
        }

        // spring towards target
        p.vx += (tpx - p.x) * 0.06
        p.vy += (tpy - p.y) * 0.06
        // damping
        p.vx *= 0.85
        p.vy *= 0.85
        p.x += p.vx
        p.y += p.vy

        // draw
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fill()
      }

      rafRef.current = requestAnimationFrame(render)
    }

    image.onload = () => {
      if (disposed) return
      createParticles()
      render()
    }

    const onEnter = () => {
      gsap.to(disperseRef, { current: 0, duration: 1, ease: 'power2.out' })
    }
    const onLeave = () => {
      gsap.to(disperseRef, { current: 1, duration: 1, ease: 'power2.out' })
    }

    const scroller = document.querySelector('[data-scroll-container]') || window
    const st = ScrollTrigger.create({
      trigger: container,
      start: 'top 80%',
      end: 'bottom top',
      scroller,
      onEnter: onEnter,
      onEnterBack: onEnter,
      onLeave: onLeave,
      onLeaveBack: onLeave,
    })

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current.x = e.clientX - rect.left
      mouseRef.current.y = e.clientY - rect.top
      mouseRef.current.inside = true
    }
    const onLeaveMouse = () => {
      mouseRef.current.inside = false
    }
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeaveMouse)

    return () => {
      disposed = true
      st.kill()
      cancelAnimationFrame(rafRef.current)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeaveMouse)
    }
  }, [src, width, height, sampleGap, particleSize])

  return (
    <div ref={containerRef} className={`relative ${className}`} style={{ width, height }}>
      <canvas ref={canvasRef} className="block" />
    </div>
  )
}


