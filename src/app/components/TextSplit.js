'use client'

import { useEffect, useMemo, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function TextSplit({
  text,
  className = '',
  stagger = 0.03,
  from = { yPercent: 120, rotateZ: 10 },
  to = { yPercent: 0, rotateZ: 0, opacity: 1 },
  triggerOffset = 'top 80%'
}) {
  const containerRef = useRef(null)

  const chars = useMemo(() => text.split(''), [text])

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    const targets = el.querySelectorAll('[data-char]')
    const scroller = document.querySelector('[data-scroll-container]') || window

    gsap.set(targets, { opacity: 0, ...from })
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: triggerOffset,
        scroller,
        once: true,
      },
      defaults: { ease: 'power3.out' },
    })
    tl.to(targets, { ...to, stagger })

    return () => {
      tl.revert()
    }
  }, [from, to, stagger, triggerOffset])

  return (
    <span ref={containerRef} className={`inline-block ${className}`} aria-label={text}>
      {chars.map((c, i) => (
        <span
          key={i}
          data-char
          className="inline-block will-change-transform"
          style={{ display: 'inline-block' }}
        >
          {c === ' ' ? '\u00A0' : c}
        </span>
      ))}
    </span>
  )
}


