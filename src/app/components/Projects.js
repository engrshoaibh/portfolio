'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import TextSplit from './TextSplit'
import DistortedImage from './DistortedImage'
import imgA from '../../../assets/325363351-baaf3e60-1b46-44da-9b34-6b5787100655.jpg'
import imgB from '../../../assets/325364184-bd85ef15-b275-43f8-81ba-6cfeb7b47d6a.jpg'
import imgC from '../../../assets/profileImage.jpg'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    title: "Brain Tumor & Alzheimer's Detection",
    description: 'Research project using deep learning for medical imaging.',
    tags: ['Python', 'TensorFlow', 'Research'],
    image: imgA,
  },
  {
    title: 'Portfolio Website',
    description: 'Modern Next.js portfolio with smooth scroll and animations.',
    tags: ['Next.js', 'GSAP', 'Tailwind'],
    image: imgB,
  },
  {
    title: 'Realtime Chat',
    description: 'WebSocket-based chat with typing indicators and presence.',
    tags: ['React', 'WebSocket', 'Node.js'],
    image: imgC,
  },
  {
    title: 'Design System',
    description: 'Composable UI kit with tokens and themes for multiple apps.',
    tags: ['Storybook', 'TypeScript', 'CSS Vars'],
    image: imgB,
  },
  {
    title: 'Analytics Dashboard',
    description: 'Complex charts, drilldowns, and realtime KPIs.',
    tags: ['Next.js', 'D3', 'WebSocket'],
    image: imgA,
  },
  {
    title: 'E‑commerce Frontend',
    description: 'SSR product catalog with blazing interactions.',
    tags: ['Next.js', 'Zustand', 'GSAP'],
    image: imgC,
  },
]

export default function Projects() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return
    const scroller = document.querySelector('[data-scroll-container]') || window

    const cards = section.querySelectorAll('[data-card]')
    gsap.set(cards, { y: 60, opacity: 0, rotate: 0 })

    const quickRotators = Array.from(cards).map((card) =>
      gsap.quickTo(card, 'rotation', { duration: 0.25, ease: 'power2.out' })
    )
    const quickSkews = Array.from(cards).map((card) =>
      gsap.quickTo(card, 'skewY', { duration: 0.15, ease: 'power2.out' })
    )

    // Mouse tilt and thumb parallax
    const removeListeners = []
    cards.forEach((card) => {
      const thumb = card.querySelector('[data-thumb]')
      const onMove = (e) => {
        const r = card.getBoundingClientRect()
        const px = (e.clientX - r.left) / r.width - 0.5
        const py = (e.clientY - r.top) / r.height - 0.5
        gsap.to(card, { rotateY: px * 6, rotateX: -py * 6, transformPerspective: 800, duration: 0.2 })
        if (thumb) gsap.to(thumb, { x: px * 12, y: py * 12, duration: 0.2 })
      }
      const onLeave = () => {
        gsap.to(card, { rotateY: 0, rotateX: 0, skewY: 0, duration: 0.3, ease: 'power2.out' })
        if (thumb) gsap.to(thumb, { x: 0, y: 0, duration: 0.3 })
      }
      card.addEventListener('mousemove', onMove)
      card.addEventListener('mouseleave', onLeave)
      removeListeners.push(() => {
        card.removeEventListener('mousemove', onMove)
        card.removeEventListener('mouseleave', onLeave)
      })
    })

    cards.forEach((card, idx) => {
      const quickRotate = quickRotators[idx]
      const quickSkew = quickSkews[idx]
      const thumb = card.querySelector('[data-thumb]')

      gsap.set(card, { clipPath: 'inset(12% round 20px)' })
      if (thumb) gsap.set(thumb, { scale: 1.08 })

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: card,
          start: 'top 80%',
          scroller,
          onUpdate(self) {
            const direction = self.direction // 1 down, -1 up
            quickRotate(direction > 0 ? 0.4 : -0.4)
            const v = self.getVelocity()
            const skew = gsap.utils.clamp(-6, 6, v / 200)
            quickSkew(skew)
          },
          onLeave: () => gsap.to(card, { skewY: 0, duration: 0.2 }),
          onEnterBack: () => gsap.to(card, { skewY: 0, duration: 0.2 }),
        },
      })
      tl.to(card, { y: 0, opacity: 1, clipPath: 'inset(0% round 20px)', duration: 0.9, ease: 'power3.out' })
      if (thumb) tl.to(thumb, { scale: 1, duration: 0.9, ease: 'power3.out' }, '<')
    })

    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill())
      removeListeners.forEach(fn => fn())
    }
  }, [])

  return (
    <section id="projects" ref={sectionRef} className="mx-auto max-w-7xl px-6 md:px-8 py-24">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-1 h-fit md:sticky top-24" data-sticky>
          <h2 className="text-3xl md:text-4xl font-bold relative z-10">
            <TextSplit text="Selected Projects" />
          </h2>
          <p className="mt-4 text-gray-300 max-w-sm">
            A mix of research and product work with an emphasis on UX, performance, and maintainable code.
          </p>
        </div>
        <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {PROJECTS.map((p) => (
            <article
              key={p.title}
              data-card
              className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-orange-500/25 via-orange-400/10 to-transparent hover:from-orange-400/50 transition card-hover"
            >
              <div className="relative rounded-2xl h-full w-full overflow-hidden bg-white/5 backdrop-blur p-5 border border-white/10">
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl">
                  <DistortedImage src={p.image?.src} className="absolute inset-0" dataThumb />
                  <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition">
                    <div className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-white/20 to-transparent blur-2xl transform group-hover:translate-x-[200%] duration-700"></div>
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-semibold">{p.title}</h3>
                <p className="mt-2 text-gray-300 text-sm">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] px-2 py-1 rounded-full bg-orange-500/15 text-orange-300 border border-orange-400/20"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}


