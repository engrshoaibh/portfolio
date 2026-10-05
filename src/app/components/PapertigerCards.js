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

  // Fan-out parameters for exactly 6 cards (matching papertiger.com)
  const spread = [
    { rotate: -12, x: -494, y: 50 },
    { rotate: -8, x: -317, y: 20 },
    { rotate: -4, x: -134, y: 5 },
    { rotate: 4, x: 32, y: 5 },
    { rotate: 8, x: 199, y: 20 },
    { rotate: 12, x: 377, y: 50 },
  ]

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
            gsap.to(card, {
              opacity: 1,
              y: spread[i]?.y || 0,
              x: spread[i]?.x || 0,
              rotation: spread[i]?.rotate || 0,
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
  }, [])

  const handleMouseEnter = (i) => {
    setHoveredIndex(i)
    // Elevate hovered card without scaling, matching papertiger's pronounced lift
    gsap.to(cardsRef.current[i], {
      y: (spread[i]?.y || 0) - 60, // pull up out of the deck
      zIndex: 50,
      duration: 0.6,
      ease: 'power3.out',
      filter: 'brightness(1)',
      boxShadow: '0 40px 80px -20px rgba(0,0,0,0.4)',
    })

    // Dim other cards using brightness instead of opacity
    // Opacity causes a washout glitch on light backgrounds!
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
    // Return card to normal
    gsap.to(cardsRef.current[i], {
      y: spread[i]?.y || 0,
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
            style={{ 
              zIndex: 10 + i,
              boxShadow: '0 10px 30px -10px rgba(0,0,0,0.3)'
            }}
            className="absolute top-0 left-1/2 -ml-[160px] w-[320px] h-[450px] rounded-xl overflow-hidden cursor-pointer will-change-transform bg-gray-200 dark:bg-gray-800 border border-white/10"
          >
            <Image
              src={p.image?.src || p.image}
              alt={p.title}
              fill
              className="object-cover pointer-events-none select-none"
              sizes="320px"
              priority={i < 3}
            />
            {/* Subtle gradient overlay to mimic the dark mood of papertiger */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/60 opacity-20 pointer-events-none" />
          </div>
        ))}
      </div>

      {/* Dynamic Title */}
      <div className="h-16 flex items-center justify-center w-full px-6 text-center">
        <h3 className={`text-4xl md:text-5xl font-bold font-poppins text-gray-900 dark:text-white transition-all duration-300 ${hoveredIndex !== null ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {hoveredIndex !== null ? projects[hoveredIndex].title : ""}
        </h3>
      </div>
    </div>
  )
}
