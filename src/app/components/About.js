'use client'

import { useEffect, useState, useMemo } from 'react'
import Image from 'next/image'
import { FiArrowRight, FiDownload, FiCheckCircle } from 'react-icons/fi'
import { FaGithub, FaLinkedinIn, FaTwitter } from 'react-icons/fa'
import { HiSparkles } from 'react-icons/hi2'
import profilePic from '../../../assets/image-nobg.png'

export default function About() {
  const [mounted, setMounted] = useState(false)
  const [text, setText] = useState('')
  const [isDeleting, setIsDeleting] = useState(false)
  const [loopNum, setLoopNum] = useState(0)
  const [typingSpeed, setTypingSpeed] = useState(130)

  const roles = useMemo(() => [
    "Full-Stack Web Developer",
    "AI Automation Specialist",
    "Creative Video & UGC Producer",
    "Next.js & React Engineer"
  ], [])

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleTyping = () => {
      const currentRole = roles[loopNum % roles.length]
      setText(
        isDeleting
          ? currentRole.substring(0, text.length - 1)
          : currentRole.substring(0, text.length + 1)
      )

      setTypingSpeed(isDeleting ? 45 : 120)

      if (!isDeleting && text === currentRole) {
        setTimeout(() => setIsDeleting(true), 1800)
      } else if (isDeleting && text === '') {
        setIsDeleting(false)
        setLoopNum(loopNum + 1)
      }
    }

    const timer = setTimeout(handleTyping, typingSpeed)
    return () => clearTimeout(timer)
  }, [text, isDeleting, loopNum, typingSpeed, roles])

  const scrollToSection = (id) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="relative mx-auto max-w-7xl px-6 md:px-8 pt-28 pb-20 lg:pt-36 lg:pb-28">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
        
        {/* Left Column: Text & Experience Intro */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 backdrop-blur-md mb-6 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-orange-500"></span>
            </span>
            <span className="text-xs sm:text-sm font-semibold tracking-wide text-orange-600 dark:text-orange-400">
              Available for Projects & Contracts
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-poppins tracking-tight text-gray-900 dark:text-white leading-[1.15]">
            Hi, I&apos;m <span className="bg-gradient-to-r from-orange-500 via-amber-500 to-orange-600 bg-clip-text text-transparent">Shoaib Hassan</span>
          </h1>

          {/* Dynamic Typing Subtitle */}
          <div className="mt-4 flex items-center gap-2 text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-300 min-h-[40px]">
            <span>I build as a</span>
            <span className="text-orange-500 dark:text-orange-400 font-bold border-b-2 border-orange-500/40">
              {text}
            </span>
            <span className="text-orange-500 animate-pulse font-bold">|</span>
          </div>

          {/* Bio Description */}
          <p className="mt-6 text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
            Software Engineer with 2+ years of experience engineering high-performance web applications, 
            intelligent AI automation pipelines, and high-converting visual media—from viral UGC ad creatives to listing enhancements.
          </p>

          {/* Experience Highlights / Chips */}
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-3 w-full max-w-xl">
            <div className="p-3.5 rounded-xl bg-white/60 dark:bg-zinc-900/60 border border-gray-200/80 dark:border-white/10 backdrop-blur-md shadow-sm">
              <div className="text-2xl font-extrabold text-orange-500 dark:text-orange-400">2+ Years</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">Hands-on Experience</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/60 dark:bg-zinc-900/60 border border-gray-200/80 dark:border-white/10 backdrop-blur-md shadow-sm">
              <div className="text-2xl font-extrabold text-orange-500 dark:text-orange-400">Next.js & AI</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">Core Modern Stack</div>
            </div>
            <div className="p-3.5 rounded-xl bg-white/60 dark:bg-zinc-900/60 border border-gray-200/80 dark:border-white/10 backdrop-blur-md shadow-sm col-span-2 sm:col-span-1">
              <div className="text-2xl font-extrabold text-orange-500 dark:text-orange-400">High ROAS</div>
              <div className="text-xs text-gray-500 dark:text-gray-400 font-medium mt-0.5">Media & UGC Ads</div>
            </div>
          </div>

          {/* Capability Bullets */}
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs sm:text-sm text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-1.5">
              <FiCheckCircle className="text-orange-500 flex-shrink-0" />
              <span>Full-Stack Web Apps</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FiCheckCircle className="text-orange-500 flex-shrink-0" />
              <span>AI Agents & Workflows</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FiCheckCircle className="text-orange-500 flex-shrink-0" />
              <span>Listing Upscaling & Video</span>
            </div>
            <div className="flex items-center gap-1.5">
              <FiCheckCircle className="text-orange-500 flex-shrink-0" />
              <span>YouTube & UGC Content</span>
            </div>
          </div>

          {/* Call to Actions & Social Links */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <button
              onClick={() => scrollToSection('projects')}
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-gradient-to-r from-orange-500 via-orange-600 to-amber-600 text-white font-semibold text-sm shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-105 active:scale-95 transition-all duration-200"
            >
              <span>Explore My Work</span>
              <FiArrowRight size={16} />
            </button>

            <button
              onClick={() => scrollToSection('services')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white/80 dark:bg-zinc-900/80 hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-800 dark:text-white font-semibold text-sm border border-gray-200 dark:border-white/10 shadow-sm transition-all duration-200 hover:scale-105 active:scale-95"
            >
              <HiSparkles className="text-orange-500" size={16} />
              <span>View Services</span>
            </button>

            <a
              href="https://drive.google.com/uc?export=download&id=1Y9VdGCSZeILbqWDyZfAQLfk5ndOXEmC-"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3.5 rounded-xl bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 text-sm font-medium border border-gray-200/60 dark:border-white/10 transition-all duration-200"
            >
              <FiDownload size={15} />
              <span>CV</span>
            </a>

            {/* Social Icons */}
            <div className="flex items-center gap-2.5 pl-2">
              <a
                href="https://github.com/engrshoaibh"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className="p-3 rounded-xl bg-white/70 dark:bg-zinc-900/70 border border-gray-200/80 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hover:scale-110 transition-all shadow-sm"
              >
                <FaGithub size={18} />
              </a>
              <a
                href="https://linkedin.com/in/engrshoaibhassan"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="p-3 rounded-xl bg-white/70 dark:bg-zinc-900/70 border border-gray-200/80 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hover:scale-110 transition-all shadow-sm"
              >
                <FaLinkedinIn size={18} />
              </a>
              <a
                href="https://x.com/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X (Twitter)"
                className="p-3 rounded-xl bg-white/70 dark:bg-zinc-900/70 border border-gray-200/80 dark:border-white/10 text-gray-700 dark:text-gray-300 hover:text-orange-500 dark:hover:text-orange-400 hover:scale-110 transition-all shadow-sm"
              >
                <FaTwitter size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Visual Portrait with Interactive Glass Badges */}
        <div className="lg:col-span-5 flex justify-center items-center relative">
          
          {/* Subtle Ambient Backlight Glow */}
          <div className="absolute w-[320px] sm:w-[400px] h-[320px] sm:h-[400px] bg-gradient-to-tr from-orange-500/20 via-amber-500/15 to-transparent rounded-full blur-3xl pointer-events-none" />

          {/* Profile Card Container */}
          <div className="relative group">
            
            {/* Outer Rounded Container with Border Gradient */}
            <div className="relative w-[280px] sm:w-[340px] md:w-[380px] aspect-square rounded-3xl p-2 bg-gradient-to-b from-white/80 via-white/40 to-white/10 dark:from-white/15 dark:via-white/5 dark:to-transparent border border-gray-200/80 dark:border-white/15 backdrop-blur-xl shadow-2xl">
              <div className="relative w-full h-full rounded-2xl overflow-hidden bg-gradient-to-b from-orange-50 to-orange-100/50 dark:from-zinc-900 dark:to-black">
                <Image
                  src={profilePic}
                  alt="Shoaib Hassan"
                  fill
                  priority
                  sizes="(max-width: 768px) 280px, (max-width: 1024px) 340px, 380px"
                  className="object-cover object-center select-none transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Floating Glass Pill 1 (Top Right) */}
            <div className="absolute -top-4 -right-4 sm:-right-6 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-gray-200 dark:border-white/15 shadow-xl flex items-center gap-2 animate-bounce-slow">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs font-bold text-gray-800 dark:text-gray-200">Next.js & React</span>
            </div>

            {/* Floating Glass Pill 2 (Bottom Left) */}
            <div className="absolute -bottom-4 -left-4 sm:-left-6 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-gray-200 dark:border-white/15 shadow-xl flex items-center gap-2 shadow-orange-500/10">
              <span className="text-orange-500 text-sm">🤖</span>
              <span className="text-xs font-bold text-gray-800 dark:text-gray-200">AI Automations</span>
            </div>

            {/* Floating Glass Pill 3 (Bottom Right) */}
            <div className="hidden sm:flex absolute bottom-8 -right-8 bg-white/90 dark:bg-zinc-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-gray-200 dark:border-white/15 shadow-lg items-center gap-2">
              <span className="text-orange-500 text-xs">🎬</span>
              <span className="text-[11px] font-semibold text-gray-700 dark:text-gray-300">UGC & 4K Media</span>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}
