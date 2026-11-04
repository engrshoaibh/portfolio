'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { 
  SiNextdotjs, 
  SiReact, 
  SiTailwindcss, 
  SiTypescript, 
  SiPython, 
  SiSupabase, 
  SiNodedotjs, 
  SiFlutter 
} from 'react-icons/si'

gsap.registerPlugin(ScrollTrigger)

const TECH_ITEMS = [
  { name: 'Next.js 15', category: 'Full-Stack', icon: <SiNextdotjs size={32} />, color: 'from-zinc-700 to-black text-white' },
  { name: 'React 19', category: 'Frontend', icon: <SiReact size={32} className="text-cyan-400" />, color: 'from-cyan-500/20 to-blue-500/20' },
  { name: 'Tailwind CSS', category: 'UI & Styling', icon: <SiTailwindcss size={32} className="text-sky-400" />, color: 'from-sky-500/20 to-teal-500/20' },
  { name: 'TypeScript', category: 'Language', icon: <SiTypescript size={32} className="text-blue-500" />, color: 'from-blue-600/20 to-indigo-600/20' },
  { name: 'Python & AI', category: 'LLMs & Agents', icon: <SiPython size={32} className="text-amber-400" />, color: 'from-amber-500/20 to-yellow-500/20' },
  { name: 'Supabase', category: 'Backend & DB', icon: <SiSupabase size={32} className="text-emerald-400" />, color: 'from-emerald-500/20 to-teal-500/20' },
  { name: 'Node.js', category: 'Runtime', icon: <SiNodedotjs size={32} className="text-green-500" />, color: 'from-green-600/20 to-emerald-600/20' },
  { name: 'Flutter', category: 'Mobile App Dev', icon: <SiFlutter size={32} className="text-sky-400" />, color: 'from-blue-500/20 to-cyan-500/20' },
]

export default function TechStack() {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const cards = el.querySelectorAll('[data-tech]')
    gsap.set(cards, { y: 25, opacity: 0 })
    cards.forEach((card, i) => {
      gsap.to(card, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        ease: 'power3.out',
        delay: i * 0.04,
        scrollTrigger: { trigger: card, start: 'top 88%' },
      })
    })
  }, [])

  return (
    <section id="tech" ref={ref} className="mx-auto max-w-7xl px-6 md:px-8 py-24 scroll-mt-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="h-2 w-2 rounded-full bg-orange-500"></span>
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">
              Tooling & Ecosystem
            </span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold font-poppins text-gray-900 dark:text-white">
            Technologies & Frameworks
          </h2>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400 max-w-md">
          A modern stack optimized for developer velocity, sub-second load times, and reliable production scalability.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
        {TECH_ITEMS.map((t) => (
          <div
            key={t.name}
            data-tech
            className="group relative rounded-2xl p-[1px] bg-gradient-to-br from-gray-200 dark:from-white/10 to-transparent hover:from-orange-500/40 hover:to-orange-500/10 transition-all duration-300"
          >
            <div className="rounded-2xl h-full w-full bg-white/70 dark:bg-[#111111] backdrop-blur-md border border-gray-200/80 dark:border-white/10 p-5 flex flex-col items-center justify-center text-center shadow-sm group-hover:shadow-md transition-shadow">
              <div className="p-3.5 rounded-xl bg-gray-100 dark:bg-white/5 border border-gray-200/50 dark:border-white/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                {t.icon}
              </div>
              <div className="mt-3 font-bold text-sm text-gray-900 dark:text-white">
                {t.name}
              </div>
              <div className="text-[11px] text-gray-500 dark:text-gray-400 font-medium">
                {t.category}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
