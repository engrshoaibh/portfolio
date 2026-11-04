'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FiExternalLink, FiArrowRight } from 'react-icons/fi'

import bulkBridgeImg from '../../../assets/bulkbridge-desktop.jpg'
import adidasImg from '../../../assets/adidas-mockup.jpg'
import shotFoxImg from '../../../assets/shotfox-mockup.jpg'
import shotFoxScreenshot from '../../../assets/shotfox-screenshot.png'

const FEATURED_PROJECTS = [
  {
    title: 'ShotFox',
    category: 'SaaS Platform • Next.js',
    description: 'SaaS product that turns plain app screenshots into high-converting App Store & Google Play Store sets with custom templates, device frames, headlines, and all store-required export dimensions.',
    tags: ['Next.js', 'React', 'Tailwind', 'SaaS'],
    image: shotFoxImg,
    screenshot: shotFoxScreenshot,
    live: 'https://shotfox.site',
  },
  {
    title: 'BulkBridge',
    category: 'B2B Marketplace • Full-Stack',
    description: 'Modern B2B wholesale marketplace connecting independent retailers directly with verified distributors. Eliminates intermediaries for transparent pricing and seamless bulk ordering.',
    tags: ['React 19', 'Supabase', 'Tailwind'],
    image: bulkBridgeImg,
    github: 'https://github.com/engrshoaibh/bulk-bridge-web',
    live: 'https://bulk-bridge-web.lovable.app/',
  },
  {
    title: 'Adidas Landing Page',
    category: 'Frontend Engineering • Vite',
    description: 'Pixel-perfect React clone of a WPBrigade landing page as part of a hiring test. Responsive design with polished animations, micro-interactions, and component architecture.',
    tags: ['React', 'Tailwind', 'Vite'],
    image: adidasImg,
    github: 'https://github.com/engrshoaibh/adidas',
    live: 'https://adidas-self-eight.vercel.app',
  },
]

export default function Projects() {
  const [activeMedia, setActiveMedia] = useState('mockup') // for ShotFox toggle

  return (
    <section id="projects" className="py-24 sm:py-32 scroll-mt-20 w-full overflow-hidden bg-gray-50/70 dark:bg-[#070708] border-y border-gray-200/60 dark:border-white/5 transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="h-2 w-2 rounded-full bg-orange-500"></span>
              <span className="text-xs font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">
                Selected Work
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-poppins tracking-tight text-gray-900 dark:text-white">
              Featured Projects
            </h2>
            <p className="mt-4 text-base text-gray-600 dark:text-gray-300 leading-relaxed">
              A curated selection of production SaaS applications, full-stack systems, and high-performance web experiences.
            </p>
          </div>

          <Link
            href="/projects"
            className="group inline-flex items-center gap-2 text-sm font-semibold text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
          >
            <span>View All Projects Archive</span>
            <FiArrowRight className="transition-transform group-hover:translate-x-1" size={16} />
          </Link>
        </div>

        {/* Simplified & Impactful Project Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_PROJECTS.map((project, idx) => {
            const isShotFox = project.title === 'ShotFox'
            const displayImg = isShotFox && activeMedia === 'screenshot' ? project.screenshot : project.image

            return (
              <div
                key={project.title}
                className="group flex flex-col h-full rounded-2xl bg-white dark:bg-[#111111] border border-gray-200/90 dark:border-white/10 overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_32px_-8px_rgba(249,115,22,0.15)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.8)] transition-all duration-300 hover:-translate-y-1"
              >
                {/* 16:9 Image Preview Container */}
                <div className="relative w-full aspect-[16/9] bg-slate-900 overflow-hidden border-b border-gray-100 dark:border-white/5">
                  <Image
                    src={displayImg}
                    alt={project.title}
                    fill
                    quality={95}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 400px"
                    className="object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.4,0.3,0,1)] group-hover:scale-105"
                  />

                  {/* ShotFox Media Toggle */}
                  {isShotFox && (
                    <div className="absolute top-3 left-3 inline-flex items-center p-0.5 rounded-lg bg-black/70 backdrop-blur-md border border-white/15 text-[10px] font-medium text-white shadow-md">
                      <button
                        onClick={() => setActiveMedia('mockup')}
                        className={`px-2 py-0.5 rounded ${activeMedia === 'mockup' ? 'bg-orange-500 font-bold' : 'text-gray-300 hover:text-white'}`}
                      >
                        Mockup
                      </button>
                      <button
                        onClick={() => setActiveMedia('screenshot')}
                        className={`px-2 py-0.5 rounded ${activeMedia === 'screenshot' ? 'bg-orange-500 font-bold' : 'text-gray-300 hover:text-white'}`}
                      >
                        Screenshot
                      </button>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="p-6 flex flex-col flex-grow">
                  
                  {/* Category and Tags */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                      {project.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 leading-snug group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6 flex-grow line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
                    {project.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-[10px] sm:text-[11px] font-medium tracking-wide text-orange-700 dark:text-orange-300 bg-orange-50 dark:bg-orange-500/10 rounded-md border border-orange-200/60 dark:border-orange-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-auto pt-4 border-t border-gray-100 dark:border-white/5 flex items-center gap-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 transition-colors"
                      >
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                        </svg>
                        <span>GitHub</span>
                      </a>
                    )}
                    {project.live && (
                      <a
                        href={project.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1.5 text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 px-3.5 py-1.5 rounded-lg transition-all shadow-sm hover:shadow-orange-500/25"
                      >
                        <FiExternalLink size={13} />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* View All CTA Footer */}
        <div className="mt-14 flex justify-center">
          <Link
            href="/projects"
            className="group inline-flex items-center gap-3 px-8 py-3.5 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-zinc-900 text-xs sm:text-sm font-bold tracking-wider uppercase text-gray-900 dark:text-white hover:border-orange-500 dark:hover:border-orange-500 hover:text-orange-600 dark:hover:text-orange-400 transition-all shadow-sm hover:shadow-md"
          >
            <span>Explore All Projects Archive</span>
            <FiArrowRight className="transition-transform group-hover:translate-x-1 text-orange-500" size={15} />
          </Link>
        </div>

      </div>
    </section>
  )
}
