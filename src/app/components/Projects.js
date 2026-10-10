'use client'

import { useMemo, useState, useEffect } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const PapertigerCards = dynamic(() => import('./PapertigerCards'), { ssr: false })
import TextSplit from './TextSplit'
import imgA from '../../../assets/325363351-baaf3e60-1b46-44da-9b34-6b5787100655.jpg'
import imgB from '../../../assets/325364184-bd85ef15-b275-43f8-81ba-6cfeb7b47d6a.jpg'
import imgC from '../../../assets/profileImage.jpg'
import bulkBridgeImg from '../../../assets/bulkbridge-desktop.jpg'

const PROJECTS = [
  {
    title: 'BulkBridge',
    description: 'Modern B2B wholesale marketplace connecting independent retailers directly with verified distributors. Eliminates intermediaries for transparent pricing and seamless bulk ordering.',
    tags: ['React 19', 'Supabase', 'Tailwind'],
    image: bulkBridgeImg,
    github: 'https://github.com/engrshoaibh/bulk-bridge-web',
    live: 'https://bulk-bridge-web.lovable.app/',
  },
  {
    title: 'Adidas Landing Page',
    description: 'Pixel-perfect React clone of a WPBrigade landing page as part of a hiring test. Responsive design with polished animations and component architecture.',
    tags: ['React', 'Tailwind', 'Vite'],
    image: imgB,
    github: 'https://github.com/engrshoaibh/adidas',
    live: 'https://adidas-self-eight.vercel.app',
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
            A curated selection of production apps, AI tools, systems programming, and full-stack experiments.
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

              {/* Links */}
              <div className="mt-3 flex items-center gap-3">
                {p.github && (
                  <a
                    href={p.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[11px] font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                    GitHub
                  </a>
                )}
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 text-[11px] font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
                  >
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                    Live
                  </a>
                )}
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
