'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Image from 'next/image'
import SectionHeading from './SectionHeading'
import LogoLoop from '@/components/LogoLoop'

gsap.registerPlugin(ScrollTrigger)

const ITEMS = [
  { name: 'FlutterFlow', icon: "/framework/flutter.png", color: 'from-fuchsia-500 to-orange-400' },
  { name: 'Flutter', icon: "/framework/flutter.png", color: 'from-cyan-400 to-blue-500' },
  { name: 'React Native', icon: "/framework/react.png", color: 'from-sky-400 to-cyan-400' },
  { name: 'JavaScript', icon: "/framework/javascript.png", color: 'from-yellow-400 to-amber-500' },
]

const LOGOS = [
  { src: '/framework/flutter.png', alt: 'Flutter', title: 'Flutter', width: 40, height: 40 },
  { node: <span className="font-semibold text-white/90 whitespace-nowrap">FlutterFlow</span>, ariaLabel: 'FlutterFlow', title: 'FlutterFlow' },
  { src: '/framework/react.png', alt: 'React', title: 'React', width: 40, height: 40 },
  { node: <span className="font-semibold text-white/90 whitespace-nowrap">React Native</span>, ariaLabel: 'React Native', title: 'React Native' },
  { node: <span className="font-semibold text-white/90 whitespace-nowrap">Next.js</span>, ariaLabel: 'Next.js', title: 'Next.js' },
  { src: '/framework/javascript.png', alt: 'JavaScript', title: 'JavaScript', width: 40, height: 40 },
  { node: <span className="font-semibold text-white/90 whitespace-nowrap">Tailwind CSS</span>, ariaLabel: 'Tailwind CSS', title: 'Tailwind CSS' },
  { node: <span className="font-semibold text-white/90 whitespace-nowrap">GSAP</span>, ariaLabel: 'GSAP', title: 'GSAP' },
]

export default function TechStack() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const scroller = document.querySelector('[data-scroll-container]') || window
    const cards = el.querySelectorAll('[data-tech]')
    gsap.set(cards, { y: 30, opacity: 0 })
    cards.forEach((card, i) => {
      gsap.to(card, {
        y: 0,
        opacity: 1,
        duration: 0.7,
        ease: 'power3.out',
        delay: i * 0.05,
        scrollTrigger: { trigger: card, start: 'top 85%', scroller },
      })
    })
  }, [])

  return (
    <section id="tech" ref={ref} className="mx-auto max-w-7xl px-6 md:px-8 py-24">
      <SectionHeading textClassName="!text-3xl md:!text-4xl">Technologies</SectionHeading>
      <p className="mt-3 text-gray-300">1.5+ years of experience in FlutterFlow, Flutter, and React Native mobile app development, plus Next.js and React on the web.</p>
      <div className="mt-8">
        <LogoLoop
          logos={LOGOS}
          speed={70}
          gap={56}
          logoHeight={40}
          pauseOnHover
          fadeOut
          fadeOutColor="#000000"
          scaleOnHover
          ariaLabel="Technologies"
        />
      </div>
      <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-6">
        {ITEMS.map((t) => {
          const Icon = t.icon
          return (
            <div
              key={t.name}
              data-tech
              className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-white/10 to-transparent hover:from-white/20 transition card-hover"
            >
              <div className="rounded-2xl h-full w-full bg-white/5 backdrop-blur border border-white/10 p-5 flex flex-col items-center justify-center">
                <div className={`rounded-xl p-4 bg-gradient-to-br ${t.color} text-black/80 shadow-inner`}
                >
                  {Icon ? (
                    <Image src={Icon} alt={t.name} className="h-10 w-10 drop-shadow" width={40} height={40} />
                  ) : (
                    <div className="h-10 w-10 grid place-items-center font-bold">FF</div>
                  )}
                </div>
                <div className="mt-3 font-medium">{t.name}</div>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}


