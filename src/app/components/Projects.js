'use client'

import { useMemo, useState, useEffect } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const PapertigerCards = dynamic(() => import('./PapertigerCards'), { ssr: false })
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
    <section id="projects" className="py-32 scroll-mt-24 md:scroll-mt-28 w-full overflow-hidden bg-gray-100 dark:bg-[#0a0a0a] transition-colors duration-300">
      {/* Title & Description */}
      <div className="mx-auto max-w-7xl px-6 md:px-8 mb-16 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div className="w-full">
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold font-poppins tracking-tight text-gray-900 dark:text-white">
            <TextSplit text="Latest Work" />
          </h2>
          <p className="mt-4 text-gray-600 dark:text-gray-400 max-w-2xl text-base md:text-lg">
            See how we've helped our clients grow with performance, animations, and clean UX.
          </p>
        </div>
      </div>

      {/* Conditionally Render WebGL Circular Gallery vs Simple Mobile Carousel */}
      {isDesktop ? (
        <div className="w-full relative py-20 overflow-hidden">
          <PapertigerCards projects={PROJECTS} />
        </div>
      ) : (
        /* Simple Swipeable Carousel (For Mobile & Tablet) */
        <div className="w-full overflow-x-auto snap-x snap-mandatory flex gap-6 px-6 py-6 no-scrollbar">
          {PROJECTS.map((p) => (
            <article
              key={p.title}
              className="snap-center shrink-0 w-[280px] sm:w-[320px] rounded-2xl overflow-hidden bg-white/50 dark:bg-white/5 border border-gray-200 dark:border-white/10 backdrop-blur p-5 flex flex-col justify-between"
            >
              <div>
                {/* Thumbnail Image */}
                <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-gray-100 dark:bg-black/10">
                  <Image
                    src={p.image?.src || p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 640px) 280px, 320px"
                    className="object-cover select-none"
                    draggable="false"
                  />
                </div>
                {/* Info */}
                <h3 className="mt-4 text-lg font-semibold text-gray-900 dark:text-white leading-tight">{p.title}</h3>
                <p className="mt-2 text-gray-600 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed">{p.description}</p>
              </div>
              
              {/* Tags */}
              <div className="mt-4 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] px-2 py-1 rounded-full bg-orange-100 dark:bg-orange-500/15 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-400/20"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}

      {/* View All Button */}
      <div className="mt-16 flex justify-center pb-8">
        <a 
          href="/projects" 
          className="group relative flex items-center gap-4 rounded-full border border-gray-300 dark:border-gray-700 px-8 py-4 text-sm font-semibold tracking-widest text-gray-900 dark:text-white uppercase transition-all hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-black overflow-hidden"
        >
          <span className="relative z-10 transition-transform duration-300 group-hover:-translate-x-1">VIEW ALL WORK</span>
          <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </section>
  )
}
