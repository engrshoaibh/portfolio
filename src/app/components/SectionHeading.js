'use client'

import { useLayoutEffect, useRef, useState } from 'react'
import ScrollReveal from '@/components/ScrollReveal'

export default function SectionHeading({ children, textClassName = '' }) {
  const scrollContainerRef = useRef(null)
  const [ready, setReady] = useState(false)

  useLayoutEffect(() => {
    scrollContainerRef.current = document.querySelector('[data-scroll-container]')
    setReady(true)
  }, [])

  const textClasses = `font-poppins tracking-tight text-white !font-bold !leading-[1.1] ${textClassName}`

  if (!ready) {
    return (
      <h2 className="relative z-10 my-0 text-left">
        <p className={textClasses}>{children}</p>
      </h2>
    )
  }

  return (
    <ScrollReveal
      scrollContainerRef={scrollContainerRef}
      containerClassName="relative z-10 !my-0 text-left"
      textClassName={textClasses}
      baseRotation={2}
      baseOpacity={0.12}
      blurStrength={5}
      enableBlur
    >
      {children}
    </ScrollReveal>
  )
}
