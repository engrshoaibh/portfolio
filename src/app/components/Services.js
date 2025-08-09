'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextSplit from './TextSplit'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  { title: 'Frontend Development', desc: 'React, Next.js, performant UI, accessibility, and design systems.' },
  { title: 'Animations', desc: 'GSAP, ScrollTrigger, micro-interactions, and delightful motion.' },
  { title: 'Research & Prototyping', desc: 'Rapid prototyping, experiments, and data-driven iterations.' },
]

export default function Services() {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const scroller = document.querySelector('[data-scroll-container]') || window
    const cards = el.querySelectorAll('[data-service]')
    gsap.set(cards, { scale: 0.92, opacity: 0, y: 24 })
    cards.forEach((card, idx) => {
      gsap.to(card, {
        scale: 1,
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 85%',
          scroller,
        },
        delay: idx * 0.06,
      })
    })
  }, [])

  return (
    <section id="services" ref={ref} className="mx-auto max-w-7xl px-6 md:px-8 py-24">
      <h2 className="text-3xl md:text-4xl font-bold relative z-10">
        <TextSplit text="Services" />
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {SERVICES.map(s => (
          <div
            key={s.title}
            data-service
            className="rounded-xl border border-white/10 bg-white/5/50 p-6 backdrop-blur hover:bg-white/10 transition shadow-[0_0_40px_rgba(251,146,60,0.05)] card-hover"
          >
            <h3 className="text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-gray-300">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}


