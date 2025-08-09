'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function BlobMorph({ size = 420, className = '' }) {
  const turbRef = useRef(null)
  const wrapRef = useRef(null)

  useEffect(() => {
    const turb = turbRef.current
    const wrap = wrapRef.current
    if (!turb || !wrap) return

    const tl = gsap.timeline({ repeat: -1, yoyo: true })
    tl.to(turb, { attr: { baseFrequency: 0.015 }, duration: 6, ease: 'sine.inOut' })
      .to(turb, { attr: { seed: 8 }, duration: 6, ease: 'none' }, 0)

    const rot = gsap.to(wrap, { rotate: 360, duration: 60, ease: 'none', repeat: -1 })

    return () => {
      tl.kill()
      rot.kill()
    }
  }, [])

  const s = size

  return (
    <div ref={wrapRef} className={`pointer-events-none absolute ${className}`} style={{ width: s, height: s }}>
      <svg width={s} height={s} viewBox={`0 0 ${s} ${s}`} xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="blobGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fb923c" stopOpacity="0.9" />
            <stop offset="70%" stopColor="#fb923c" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#fb923c" stopOpacity="0" />
          </radialGradient>

          <filter id="blobNoiseFilter">
            <feTurbulence ref={turbRef} type="fractalNoise" baseFrequency="0.008" numOctaves="2" seed="2" />
            <feDisplacementMap in="SourceGraphic" scale="60" />
          </filter>
        </defs>

        <g filter="url(#blobNoiseFilter)">
          <circle cx={s / 2} cy={s / 2} r={s / 2.5} fill="url(#blobGrad)" />
        </g>

        <g filter="url(#blobNoiseFilter)">
          <circle cx={(s / 2) + s * 0.08} cy={(s / 2) - s * 0.1} r={s / 3.2} fill="#fb923c" opacity="0.12" />
        </g>
      </svg>
    </div>
  )
}


