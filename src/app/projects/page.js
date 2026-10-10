'use client'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import { FiSun, FiMoon } from 'react-icons/fi'

import imgA from '../../../assets/325363351-baaf3e60-1b46-44da-9b34-6b5787100655.jpg'
import SpotlightCard from '../components/SpotlightCard'
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

export default function ProjectsPage() {
  const { setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const isLight = mounted && resolvedTheme === 'light'

  return (
    <div className="relative min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Background with subtle modern grid */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="relative h-full w-full bg-slate-50 dark:bg-[#070708] transition-colors duration-300">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e135_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e135_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-orange-400/10 dark:from-orange-500/10 via-transparent to-transparent blur-3xl pointer-events-none"></div>
        </div>
      </div>

      <main className="py-12 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Navigation Bar */}
        <div className="flex items-center justify-between mb-12 sm:mb-16">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md px-4 py-2 rounded-full border border-gray-200/80 dark:border-white/10 shadow-sm transition-all duration-300 hover:border-orange-300 dark:hover:border-orange-500/30"
          >
            <svg className="w-4 h-4 transition-transform group-hover:-translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M5 12L12 19M5 12L12 5" />
            </svg>
            <span>Back to Home</span>
          </Link>

          {mounted && (
            <button
              onClick={() => setTheme(resolvedTheme === 'dark' ? 'light' : 'dark')}
              className="p-2.5 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md text-gray-800 dark:text-gray-200 hover:text-orange-600 dark:hover:text-orange-400 border border-gray-200/80 dark:border-white/10 shadow-sm transition-all duration-300 hover:scale-105 active:scale-95"
              aria-label="Toggle theme"
            >
              {resolvedTheme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>
          )}
        </div>

        {/* Header Title Section */}
        <div className="mb-12 sm:mb-14">
          <div className="flex items-center gap-2.5 mb-3">
            <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
            <span className="text-[11px] sm:text-xs font-semibold tracking-widest uppercase text-orange-600 dark:text-orange-400">
              Selected Works Archive
            </span>
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-poppins tracking-tight text-gray-900 dark:text-white">
              All Projects
            </h1>
            <p className="text-gray-600 dark:text-gray-400 max-w-md text-xs sm:text-sm leading-relaxed">
              A comprehensive showcase of production systems, developer tools, AI applications, and creative web experiments.
            </p>
          </div>
        </div>

        {/* Standard Grid of Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PROJECTS.map((project, i) => (
            <SpotlightCard
              key={i}
              className="group flex flex-col h-full w-full border border-gray-200/90 dark:border-white/10 rounded-2xl bg-white dark:bg-[#111111] shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_12px_28px_-6px_rgba(249,115,22,0.14)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)] transition-all duration-300"
              spotlightColor={isLight ? "rgba(249, 115, 22, 0.2)" : "rgba(255, 255, 255, 0.12)"}
            >
              {/* Image Portion */}
              <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-4 bg-slate-100 dark:bg-zinc-900/60 border border-gray-100 dark:border-white/5 flex-shrink-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.4,0.3,0,1)] group-hover:scale-105"
                />
              </div>

              {/* Content Portion */}
              <div className="flex flex-col flex-grow">
                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {project.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 text-[10px] sm:text-[11px] font-medium tracking-wide text-orange-700 dark:text-orange-300 bg-orange-50/90 dark:bg-orange-500/10 rounded-md border border-orange-200/70 dark:border-orange-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h2 className="text-base sm:text-lg font-bold text-gray-900 dark:text-white mb-2 leading-snug group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                  {project.title}
                </h2>

                {/* Description */}
                <p className="text-xs sm:text-[13px] text-gray-600 dark:text-gray-400 leading-relaxed mb-4 flex-grow line-clamp-3">
                  {project.description}
                </p>

                {/* Links */}
                <div className="mt-auto pt-3 border-t border-gray-100 dark:border-white/5 flex items-center gap-3">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-semibold text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white bg-gray-100/80 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 px-3 py-1.5 rounded-lg border border-gray-200 dark:border-white/10 transition-all duration-200"
                    >
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                      GitHub
                    </a>
                  )}
                  {project.live ? (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 px-3 py-1.5 rounded-lg transition-all duration-200 shadow-sm hover:shadow-orange-500/30 hover:shadow-md"
                    >
                      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
                      </svg>
                      Live Demo
                    </a>
                  ) : (
                    <span className="ml-auto flex items-center gap-1 text-xs text-gray-400 dark:text-gray-600 italic">
                      <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>
                      No live preview
                    </span>
                  )}
                </div>
              </div>
            </SpotlightCard>
          ))}
        </div>
      </main>
    </div>
  )
}
