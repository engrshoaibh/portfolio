'use client'

import { useMemo, useState, useEffect } from 'react'
import Image from 'next/image'
import dynamic from 'next/dynamic'

const CircularGallery = dynamic(() => import('./CircularGallery'), { ssr: false })
import SectionHeading from './SectionHeading'
import GlareHover from '@/components/GlareHover'
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

function ProjectCard({ project }) {
  return (
    <GlareHover
      width="100%"
      height="100%"
      background="rgba(255,255,255,0.04)"
      borderRadius="16px"
      borderColor="rgba(255,255,255,0.12)"
      glareColor="#fb923c"
      glareOpacity={0.45}
      glareAngle={-32}
      glareSize={220}
      transitionDuration={700}
      className="h-full"
    >
      <article className="flex h-full w-full flex-col justify-between p-5 text-left">
        <div className="w-full">
          <div className="relative aspect-[16/10] w-full overflow-hidden rounded-xl bg-black/20">
            <Image
              src={project.image?.src || project.image}
              alt={project.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover select-none"
              draggable="false"
            />
          </div>
          <h3 className="mt-4 text-lg font-semibold text-white leading-tight">{project.title}</h3>
          <p className="mt-2 text-gray-300 text-sm leading-relaxed">{project.description}</p>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-[11px] px-2 py-1 rounded-full bg-orange-500/15 text-orange-300 border border-orange-400/20"
            >
              {tag}
            </span>
          ))}
        </div>
      </article>
    </GlareHover>
  )
}

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
    <section id="projects" className="py-24 scroll-mt-24 md:scroll-mt-28 w-full">
      {/* Title & Description */}
      <div className="mx-auto max-w-7xl px-6 md:px-8 mb-12 flex flex-col md:flex-row md:justify-between md:items-end gap-6">
        <div className="w-full">
          <SectionHeading textClassName="!text-3xl md:!text-5xl lg:!text-6xl">
            Selected Projects
          </SectionHeading>
          <p className="mt-4 text-gray-400 max-w-2xl text-base md:text-lg">
            A mix of mobile (Flutter/FlutterFlow) and web (Next.js/React) development with an emphasis on performance, animations, and clean UX.
          </p>
        </div>
      </div>

      {/* Conditionally Render WebGL Circular Gallery vs Simple Mobile Carousel */}
      {isDesktop ? (
        /* WebGL Circular Gallery (Full Viewport Width for Desktop) */
        <div className="w-full h-[600px] relative overflow-hidden">
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
      ) : null}

      <div className="mx-auto mt-8 grid max-w-7xl grid-cols-1 gap-6 px-6 sm:grid-cols-2 lg:grid-cols-3 md:px-8">
        {PROJECTS.map((project) => (
          <ProjectCard key={project.title} project={project} />
        ))}
      </div>
    </section>
  )
}
