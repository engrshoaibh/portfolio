'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function PapertigerCards({ projects }) {
  const containerRef = useRef(null)
  const cardsRef = useRef([])
  const [hoveredIndex, setHoveredIndex] = useState(null)

  // Dynamic fan-out parameters based on number of projects so cards are always centered
  const getSpread = (i, total) => {
    if (total <= 1) return { rotate: 0, x: 0, y: 0 }
    if (total === 2) {
      return i === 0 
        ? { rotate: -6, x: -170, y: 15 } 
        : { rotate: 6, x: 170, y: 15 }
    }
    if (total === 3) {
      if (i === 0) return { rotate: -8, x: -280, y: 20 }
      if (i === 1) return { rotate: 0, x: 0, y: 0 }
      return { rotate: 8, x: 280, y: 20 }
    }
    const progress = (i / (total - 1)) * 2 - 1
    return {
      rotate: Math.round(progress * 12),
      x: Math.round(progress * 440),
      y: Math.round(Math.abs(progress) * 45),
    }
  }

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state (stacked in the middle, pushed down slightly, invisible)
      gsap.set(cardsRef.current, {
        opacity: 0,
        y: 200,
        x: -50,
        rotation: 0,
        scale: 0.8,
      })

      // Animate fan out on scroll
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top 75%', // trigger when top of container is 75% down viewport
        onEnter: () => {
          cardsRef.current.forEach((card, i) => {
            const sp = getSpread(i, projects.length)
            gsap.to(card, {
              opacity: 1,
              y: sp.y,
              x: sp.x,
              rotation: sp.rotate,
              scale: 1,
              duration: 1.4,
              ease: 'power3.out',
              delay: i * 0.08,
            })
          })
        },
      })
    }, containerRef)

    return () => ctx.revert()
  }, [projects.length])

  const handleMouseEnter = (i) => {
    setHoveredIndex(i)
    const sp = getSpread(i, projects.length)
    // Elevate hovered card without scaling, matching papertiger's pronounced lift
    gsap.to(cardsRef.current[i], {
      y: sp.y - 60, // pull up out of the deck
      zIndex: 50,
      duration: 0.6,
      ease: 'power3.out',
      filter: 'brightness(1)',
      boxShadow: '0 40px 80px -20px rgba(0,0,0,0.4)',
    })

    // Dim other cards using brightness instead of opacity
    cardsRef.current.forEach((card, index) => {
      if (index !== i) {
        gsap.to(card, {
          filter: 'brightness(0.3)',
          duration: 0.6,
          ease: 'power3.out'
        })
      }
    })
  }

  const handleMouseLeave = (i) => {
    setHoveredIndex(null)
    const sp = getSpread(i, projects.length)
    // Return card to normal
    gsap.to(cardsRef.current[i], {
      y: sp.y,
      zIndex: 10 + i,
      duration: 0.6,
      ease: 'power3.out',
      boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)',
    })

    // Restore brightness to all cards
    cardsRef.current.forEach((card) => {
      gsap.to(card, {
        filter: 'brightness(1)',
        duration: 0.6,
        ease: 'power3.out'
      })
    })
  }

  const handleCardClick = (p) => {
    const targetUrl = p.live || p.github
    if (targetUrl) {
      window.open(targetUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <div ref={containerRef} className="relative w-full py-16 flex flex-col items-center overflow-visible">
      {/* Cards Fan */}
      <div className="relative w-full max-w-[1200px] h-[550px] flex justify-center items-center mt-12 mb-8 mx-auto">
        {projects.slice(0, 6).map((p, i) => (
          <div
            key={p.title}
            ref={(el) => (cardsRef.current[i] = el)}
            onMouseEnter={() => handleMouseEnter(i)}
            onMouseLeave={() => handleMouseLeave(i)}
            onClick={() => handleCardClick(p)}
            style={{ 
              zIndex: 10 + i,
              boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)'
            }}
            className="absolute top-0 left-1/2 -ml-[160px] w-[320px] h-[450px] rounded-xl overflow-hidden cursor-pointer will-change-transform bg-gray-200 dark:bg-gray-800 border border-white/10 group transition-shadow"
          >
            <Image
              src={p.image?.src || p.image}
              alt={p.title}
              fill
              className="object-cover pointer-events-none select-none transition-transform duration-500 group-hover:scale-105"
              sizes="320px"
              priority={i < 3}
            />
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-20 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Dynamic Title */}
      <div className="h-16 flex items-center justify-center w-full px-6 text-center">
        {hoveredIndex !== null && projects[hoveredIndex] ? (
          <a
            href={projects[hoveredIndex].live || projects[hoveredIndex].github || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-3 transition-transform hover:scale-105 cursor-pointer"
          >
            <h3 className="text-4xl md:text-5xl font-bold font-poppins text-gray-900 dark:text-white transition-colors duration-300 group-hover:text-orange-500">
              {projects[hoveredIndex].title}
            </h3>
            <svg className="w-5 h-5 text-orange-500 opacity-80 group-hover:opacity-100 transition-opacity" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/>
            </svg>
          </a>
        ) : (
          <span className="text-sm uppercase tracking-widest text-gray-400 dark:text-gray-500">
            Hover a project to preview
          </span>
        )}
      </div>
    </div>
  )
}
