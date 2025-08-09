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

      const shouldDisable = () => {
        const mql = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const isCoarse = window.matchMedia && window.matchMedia('(pointer: coarse)').matches
        const conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection
        const saveData = conn && conn.saveData
        const effType = conn && (conn.effectiveType || '')
        const slowNet = effType && /(^|\s)(2g|slow-2g)/i.test(effType)
        const isNarrow = window.innerWidth < 768
        return mql || saveData || slowNet || (isCoarse && isNarrow)
      }

      if (shouldDisable()) {
        // Mark as not using smooth scroller
        scrollRef.current.dataset.smooth = '0'
        ScrollTrigger.refresh()
        return
      }

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
      scrollRef.current.dataset.smooth = '1'

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

    if ('requestIdleCallback' in window) {
      // @ts-ignore
      requestIdleCallback(initSmoothScroll, { timeout: 2000 })
    } else {
      setTimeout(initSmoothScroll, 0)
    }

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
