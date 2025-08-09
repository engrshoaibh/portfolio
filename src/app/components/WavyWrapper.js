'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'

export default function WavyWrapper({
  children,
  as: Tag = 'div',
  className = '',
  intensity = 8, // displacement scale
  frequency = 0.006,
  speed = 10, // seconds for a full cycle
}) {
  const idRef = useRef(`wavy_${Math.random().toString(36).slice(2)}`)
  const turbRef = useRef(null)
  const dispRef = useRef(null)
  const tlRef = useRef(null)

  useEffect(() => {
    const turb = turbRef.current
    const disp = dispRef.current
    if (!turb || !disp) return

    const tl = gsap.timeline({ repeat: -1, yoyo: true })
    tl.to(turb, { attr: { baseFrequency: frequency * 1.6 }, duration: speed / 2, ease: 'sine.inOut' })
      .to(turb, { attr: { baseFrequency: frequency * 0.8 }, duration: speed / 2, ease: 'sine.inOut' })
      .to(disp, { attr: { scale: intensity * 1.15 }, duration: speed / 2, ease: 'sine.inOut' }, 0)
      .to(disp, { attr: { scale: intensity * 0.85 }, duration: speed / 2, ease: 'sine.inOut' }, speed / 2)

    tlRef.current = tl
    return () => tl.kill()
  }, [frequency, intensity, speed])

  const filterId = idRef.current

  return (
    <Tag className={`${className} will-change-transform`} style={{ filter: `url(#${filterId})` }}>
      {/* hidden defs */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden>
        <defs>
          <filter id={filterId} x="-20%" y="-20%" width="140%" height="140%" filterUnits="objectBoundingBox">
            <feTurbulence ref={turbRef} type="fractalNoise" baseFrequency={frequency} numOctaves="2" seed="2" />
            <feDisplacementMap ref={dispRef} in="SourceGraphic" scale={intensity} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        </defs>
      </svg>
      {children}
    </Tag>
  )
}


