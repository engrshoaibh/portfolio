'use client'

import { useEffect, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function SmoothScrollProvider({ children }) {
  const scrollRef = useRef(null)
  const locoRef = useRef(null)
  const currentYRef = useRef(0)

  useLayoutEffect(() => {
    let loco
    let onRefresh
    let readScrollFn

    const initSmoothScroll = async () => {
      if (!scrollRef.current) return

      // Dynamic import to avoid SSR issues
      const LocomotiveScroll = (await import('locomotive-scroll')).default

      loco = new LocomotiveScroll({
        el: scrollRef.current,
        smooth: true,
        lerp: 0.08,
        multiplier: 1,
        smartphone: { smooth: true },
        tablet: { smooth: true },
        getDirection: true,
        getSpeed: true,
      })

      locoRef.current = loco

      // Set up ScrollTrigger proxy
      ScrollTrigger.scrollerProxy(scrollRef.current, {
        scrollTop(value) {
          if (arguments.length) {
            loco.scrollTo(value, { duration: 0, disableLerp: true })
          } else {
            return currentYRef.current || 0
          }
        },
        getBoundingClientRect() {
          return {
            top: 0,
            left: 0,
            width: window.innerWidth,
            height: window.innerHeight
          }
        },
        pinType: scrollRef.current.style.transform ? 'transform' : 'fixed',
      })

      // Sync ScrollTrigger by sampling transform each frame (v5 safe)
      readScrollFn = () => {
        const style = window.getComputedStyle(scrollRef.current)
        const transform = style.transform || style.webkitTransform
        let ty = 0
        if (transform && transform !== 'none') {
          const m = transform.match(/matrix\(([^)]+)\)/)
          if (m && m[1]) {
            const parts = m[1].split(',').map(parseFloat)
            // 2D matrix(a, b, c, d, tx, ty)
            if (parts.length === 6) ty = parts[5]
          }
        }
        currentYRef.current = -ty
        ScrollTrigger.update()
      }
      gsap.ticker.add(readScrollFn)

      // Update Locomotive on ScrollTrigger refresh (guard for API differences)
       onRefresh = () => {
         if (loco && typeof loco.update === 'function') {
           loco.update()
         } else if (loco && loco.scroll && typeof loco.scroll.update === 'function') {
           loco.scroll.update()
         }
       }
       ScrollTrigger.addEventListener('refresh', onRefresh)
      ScrollTrigger.refresh()
    }

    initSmoothScroll()

    return () => {
      if (onRefresh) ScrollTrigger.removeEventListener('refresh', onRefresh)
      if (readScrollFn) gsap.ticker.remove(readScrollFn)
      loco?.destroy()
    }
  }, [])

  return (
    <div ref={scrollRef} data-scroll-container>
      {children}
    </div>
  )
}
