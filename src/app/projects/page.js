'use client'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRightIcon } from '@heroicons/react/24/outline'

import imgA from '../../../assets/325363351-baaf3e60-1b46-44da-9b34-6b5787100655.jpg'
import imgB from '../../../assets/325364184-bd85ef15-b275-43f8-81ba-6cfeb7b47d6a.jpg'
import imgC from '../../../assets/profileImage.jpg'
import bulkBridgeImg from '../../../assets/bulkbridge-desktop.png'

const PROJECTS = [
  {
    title: 'BulkBridge',
    description: 'Modern B2B wholesale marketplace connecting independent retailers directly with verified distributors, eliminating intermediaries for transparent pricing and seamless bulk ordering.',
    tags: ['React 19', 'Supabase', 'Tailwind'],
    image: bulkBridgeImg,
    span: 'md:col-span-2 md:row-span-2', // Large Feature
    color: 'bg-emerald-900',
  },
  {
    title: "Brain Tumor & Alzheimer's Detection",
    description: 'Research project using deep learning for medical imaging. Achieved 98% accuracy in early stage detection.',
    tags: ['Python', 'TensorFlow', 'Research'],
    image: imgA,
    span: 'md:col-span-1 md:row-span-1', 
    color: 'bg-indigo-900',
  },
  {
    title: 'Realtime Chat',
    description: 'WebSocket-based chat with typing indicators and presence.',
    tags: ['React', 'WebSocket'],
    image: imgC,
    span: 'md:col-span-1 md:row-span-1',
    color: 'bg-emerald-900',
  },
  {
    title: 'Portfolio Website',
    description: 'Modern Next.js portfolio with smooth scroll and animations.',
    tags: ['Next.js', 'GSAP'],
    image: imgB,
    span: 'md:col-span-1 md:row-span-2', // Tall Feature
    color: 'bg-orange-900',
  },
  {
    title: 'Design System',
    description: 'Composable UI kit with tokens and themes for multiple apps.',
    tags: ['Storybook', 'TypeScript'],
    image: imgB,
    span: 'md:col-span-1 md:row-span-1',
    color: 'bg-rose-900',
  },
  {
    title: 'Analytics Dashboard',
    description: 'Complex charts, drilldowns, and realtime KPIs.',
    tags: ['Next.js', 'D3'],
    image: imgA,
    span: 'md:col-span-2 md:row-span-1', // Wide feature
    color: 'bg-cyan-900',
  },
]

export default function ProjectsPage() {
  return (
    <main className="min-h-screen bg-slate-50 dark:bg-black py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div>
            <Link href="/" className="text-orange-500 hover:text-orange-600 dark:hover:text-orange-400 font-semibold uppercase tracking-widest text-sm flex items-center gap-2 mb-6 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M5 12L12 19M5 12L12 5"/></svg>
              Back to Home
            </Link>
            <h1 className="text-5xl md:text-7xl font-bold font-poppins tracking-tighter text-black dark:text-white">
              All Work
            </h1>
          </div>
          <p className="text-gray-600 dark:text-gray-400 max-w-sm text-lg mt-6 md:mt-0 font-medium">
            A comprehensive archive of selected products, experiments, and creative coding.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 auto-rows-[280px] gap-4">
          {PROJECTS.map((project, i) => (
            <div 
              key={i} 
              className={`group relative rounded-3xl overflow-hidden ${project.span} ${project.color} border border-gray-200 dark:border-white/10`}
            >
              {/* Background Image with Overlay */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(0.4,0.3,0,1)] group-hover:scale-105 opacity-80 group-hover:opacity-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-opacity duration-300 group-hover:opacity-80"></div>
              </div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end pointer-events-none">
                <div className="transform transition-transform duration-500 ease-[cubic-bezier(0.4,0.3,0,1)] translate-y-4 group-hover:translate-y-0">
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white bg-white/20 backdrop-blur-md rounded-full border border-white/30">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  {/* Title & Desc */}
                  <div className="flex justify-between items-end gap-4">
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-2 leading-tight">{project.title}</h2>
                      <p className="text-gray-300 text-sm line-clamp-2 max-w-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                        {project.description}
                      </p>
                    </div>
                    
                    {/* Hover Arrow */}
                    <div className="w-12 h-12 rounded-full bg-orange-500 flex items-center justify-center flex-shrink-0 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-out pointer-events-auto cursor-pointer">
                      <ArrowUpRightIcon className="w-6 h-6 text-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
}
