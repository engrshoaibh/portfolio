'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollProgress() {
  const barRef = useRef(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return
    const scroller = document.querySelector('[data-scroll-container]') || window

    gsap.set(bar, { scaleX: 0, transformOrigin: '0% 50%' })
    const st = ScrollTrigger.create({
      scroller,
      start: 0,
      end: () => (scroller === window ? document.body.scrollHeight - window.innerHeight : scroller.scrollHeight - scroller.clientHeight),
      onUpdate: (self) => {
        gsap.to(bar, { scaleX: self.progress, duration: 0.1, ease: 'power1.out' })
      },
    })
    return () => st.kill()
  }, [])

  return (
    <div className="pointer-events-none fixed left-0 right-0 top-0 z-[60] h-[3px] bg-transparent">
      <div ref={barRef} className="h-full w-full bg-orange-500/90" />
    </div>
  )
}


