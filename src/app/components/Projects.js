'use client'

import { useMemo, useState, useEffect } from 'react'
import CircularGallery from './CircularGallery'
import TextSplit from './TextSplit'
import imgA from '../../../assets/325363351-baaf3e60-1b46-44da-9b34-6b5787100655.jpg'
import imgB from '../../../assets/325364184-bd85ef15-b275-43f8-81ba-6cfeb7b47d6a.jpg'
import imgC from '../../../assets/profileImage.jpg'

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
  const [isDesktop, setIsDesktop] = useState(false)

  // Track responsive screen size (desktop vs tablet/mobile)
  useEffect(() => {
    const checkViewport = () => {
      setIsDesktop(window.innerWidth >= 1024)
    }
    checkViewport()
    window.addEventListener('resize', checkViewport)
    return () => window.removeEventListener('resize', checkViewport)
  }, [])

  const galleryItems = useMemo(() => {
    return PROJECTS.map((p) => ({
      image: p.image?.src || p.image,
      text: p.title,
    }))
  }, [])

  return (
    <section id="projects" className="py-24 scroll-mt-24 md:scroll-mt-28 w-full overflow-hidden">
      {/* Title & Description */}
      <div className="mx-auto max-w-7xl px-6 md:px-8 mb-12 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div className="w-full">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-poppins tracking-tight text-white">
            <TextSplit text="Selected Projects" />
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl text-base md:text-lg">
            A mix of mobile (Flutter/FlutterFlow) and web (Next.js/React) development with an emphasis on performance, animations, and clean UX.
          </p>
        </div>
      </div>

      {/* Conditionally Render WebGL Circular Gallery vs Simple Mobile Carousel */}
      {isDesktop ? (
        /* WebGL Circular Gallery (Full Viewport Width for Desktop) */
        <div className="w-full h-[600px] relative">
          <CircularGallery
            items={galleryItems}
            bend={3}
            textColor="#ffffff"
            borderRadius={0.06}
            scrollEase={0.03}
            fontUrl="https://fonts.googleapis.com/css2?family=Poppins:wght@700&display=swap"
            font="bold 20px Poppins"
            scrollSpeed={2.5}
          />
        </div>
      ) : (
        /* Simple Swipeable Carousel (For Mobile & Tablet) */
        <div className="w-full overflow-x-auto snap-x snap-mandatory flex gap-6 px-6 py-6 no-scrollbar scroll-smooth">
          {PROJECTS.map((p) => (
            <article
              key={p.title}
              className="snap-center shrink-0 w-[280px] sm:w-[320px] rounded-2xl overflow-hidden bg-white/5 border border-white/10 backdrop-blur p-5 flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-black/10">
                  <img
                    src={p.image?.src || p.image}
                    alt={p.title}
                    className="w-full h-full object-cover select-none"
                    draggable="false"
                  />
                </div>
                {/* Info */}
                <h3 className="mt-4 text-lg font-semibold text-white leading-tight">{p.title}</h3>
                <p className="mt-2 text-gray-300 text-sm line-clamp-3 leading-relaxed">{p.description}</p>
              </div>
              
              {/* Tags */}
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
            </article>
          ))}
        </div>
      )}
    </section>
  )
}
