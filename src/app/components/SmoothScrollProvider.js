'use client'

import { useLayoutEffect, useRef } from 'react'
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
    let onWindowScroll
    let idleId
    let timeoutId
    let cancelled = false

    const scrollerEl = scrollRef.current
    if (!scrollerEl) return undefined

    const windowProxy = {
      scrollTop(value) {
        if (arguments.length) {
          window.scrollTo(0, value)
        }
        return window.pageYOffset || document.documentElement.scrollTop || 0
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        }
      },
    }

    const bindWindowProxy = () => {
      ScrollTrigger.scrollerProxy(scrollerEl, windowProxy)
      if (!onWindowScroll) {
        onWindowScroll = () => ScrollTrigger.update()
        window.addEventListener('scroll', onWindowScroll, { passive: true })
      }
      ScrollTrigger.refresh()
    }

    bindWindowProxy()

    const initSmoothScroll = async () => {
      if (cancelled || !scrollRef.current) return

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
        scrollRef.current.dataset.smooth = '0'
        ScrollTrigger.refresh()
        return
      }

      const LocomotiveScroll = (await import('locomotive-scroll')).default
      if (cancelled || !scrollRef.current) return

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

      // locomotive-scroll v5 (Lenis) scrolls the window. Keep the window proxy
      // installed above so ScrollTrigger matches the real scroll position.
      readScrollFn = () => {
        currentYRef.current = window.pageYOffset || document.documentElement.scrollTop || 0
        ScrollTrigger.update()
      }
      gsap.ticker.add(readScrollFn)

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
      idleId = requestIdleCallback(initSmoothScroll, { timeout: 2000 })
    } else {
      timeoutId = setTimeout(initSmoothScroll, 0)
    }

    return () => {
      cancelled = true
      if (idleId && typeof cancelIdleCallback === 'function') cancelIdleCallback(idleId)
      if (timeoutId) clearTimeout(timeoutId)
      if (onWindowScroll) window.removeEventListener('scroll', onWindowScroll)
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
