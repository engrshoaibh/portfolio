'use client'

import { useState } from 'react'
import { FiCode, FiCpu, FiVideo, FiFilm, FiCheckCircle, FiGift, FiArrowRight, FiExternalLink } from 'react-icons/fi'
import { FaAirbnb, FaYoutube, FaRobot, FaWandMagicSparkles } from 'react-icons/fa6'
import { HiSparkles } from 'react-icons/hi2'

const SERVICES = [
  {
    id: 'airbnb-package',
    featured: true,
    title: 'Airbnb & Booking.com Listing Visuals (Upscale + Walkthrough)',
    badge: '⭐ FEATURED ALL-IN-ONE PACKAGE',
    badgeColor: 'bg-gradient-to-r from-orange-500 to-amber-500 text-white',
    icon: <FaAirbnb className="text-rose-500 text-2xl" />,
    summary: 'Turn your Airbnb and Booking.com listings into top-booked properties with studio-grade AI image upscaling, HDR enhancement, and a bonus walkthrough video package.',
    features: [
      'Studio-grade AI upscaling & artifact removal up to 4K resolution',
      'HDR lighting balancing, color grading & architectural perspective alignment',
      'Algorithmic image sizing & tagging optimized for Airbnb & Booking.com search rank'
    ],
    bonus: {
      title: '🎁 BONUS INCLUDED: 4K Property Walkthrough Video',
      description: 'A cinematic video walkthrough tour with smooth ambient transitions, sound design, and vertical formats for Instagram Reels & TikTok.'
    },
    cta: 'Book This Package'
  },
  {
    id: 'ugc-ads',
    featured: false,
    title: 'Product UGC Ads & Creative Content',
    badge: '🔥 HIGH ROAS',
    badgeColor: 'bg-orange-500/10 text-orange-600 dark:text-orange-400 border border-orange-500/20',
    icon: <FiVideo className="text-orange-500 text-2xl" />,
    summary: 'Authentic, scroll-stopping User-Generated Content (UGC) video ads engineered for maximum conversion on TikTok, Instagram Reels, and Meta Ads.',
    features: [
      'High-retention 3-second hook scripts tailored to your target audience',
      'Authentic product unboxings, real-world demonstrations & lifestyle integrations',
      'Multiple hook and CTA variations optimized for A/B testing campaigns'
    ],
    cta: 'Request UGC Ads'
  },
  {
    id: 'video-editing',
    featured: false,
    title: 'Video Editing, Captions & Motion Graphics',
    badge: '🎬 RETENTION EDITING',
    badgeColor: 'bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/20',
    icon: <FiFilm className="text-purple-500 text-2xl" />,
    summary: 'Engaging, modern editing for creators, brands, and podcasts with custom motion graphics, sound effects, and high-retention pacing.',
    features: [
      'Viral dynamic typography and animated captions (Hormozi / Creator styles)',
      'Curated B-roll footage selection, cinematic color correction & SFX sound design',
      'Custom 2D/3D motion graphics, animated lower-thirds & visual transitions'
    ],
    cta: 'Discuss Video Project'
  },
  {
    id: 'web-dev',
    featured: false,
    title: 'Full-Stack Web Development',
    badge: '💻 CORE STACK',
    badgeColor: 'bg-blue-500/10 text-blue-600 dark:text-blue-400 border border-blue-500/20',
    icon: <FiCode className="text-blue-500 text-2xl" />,
    summary: 'High-performance web applications and conversion-focused landing pages engineered with Next.js, React, Tailwind CSS, and scalable backends.',
    features: [
      'Modern Next.js (App Router), React 19, TypeScript & Tailwind CSS architecture',
      'Supabase, Firebase, or PostgreSQL database integration with secure authentication',
      'Sub-second load times, flawless mobile responsiveness & SEO-ready structure'
    ],
    cta: 'Build Your Website'
  },
  {
    id: 'ai-automation',
    featured: false,
    title: 'AI Automation & Intelligent Workflows',
    badge: '⚡ 20+ HRS SAVED/WK',
    badgeColor: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20',
    icon: <FaRobot className="text-emerald-500 text-2xl" />,
    summary: 'Custom autonomous AI agents and automated workflows that eliminate repetitive busywork and scale your business operations effortlessly.',
    features: [
      'Custom AI agent pipelines powered by OpenAI, Anthropic Claude & Gemini APIs',
      'End-to-end automations connecting your tools via Make, Zapier, n8n & custom scripts',
      'Automated customer support triage, lead enrichment & multi-platform sync'
    ],
    cta: 'Automate My Business'
  },
  {
    id: 'youtube-automation',
    featured: false,
    title: 'YouTube Automation & Channel Systems',
    badge: '📈 SCALABLE GROWTH',
    badgeColor: 'bg-red-500/10 text-red-600 dark:text-red-400 border border-red-500/20',
    icon: <FaYoutube className="text-red-500 text-2xl" />,
    summary: 'Turnkey channel infrastructure for faceless and branded YouTube channels—from algorithmic research and scriptwriting to voiceover and editing.',
    features: [
      'Trend-backed topic research, retention-driven script frameworks & outlines',
      'Natural AI voiceover generation or studio audio mastering & music selection',
      'High-CTR custom thumbnail design & algorithmic video SEO optimization'
    ],
    cta: 'Scale Your Channel'
  }
]

export default function Services() {
  const scrollToContact = (serviceTitle) => {
    const el = document.getElementById('contact')
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
      // Optionally focus message box or pre-fill note
      const messageInput = document.querySelector('textarea[name="message"]') || document.querySelector('textarea')
      if (messageInput) {
        messageInput.value = `Hi Shoaib, I am interested in your "${serviceTitle}" service. Let's discuss!`
        messageInput.focus()
      }
    }
  }

  return (
    <section id="services" className="py-24 sm:py-32 scroll-mt-20 w-full overflow-hidden transition-colors duration-300">
      <div className="mx-auto max-w-7xl px-6 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-600 dark:text-orange-400 text-xs font-bold tracking-widest uppercase mb-4 shadow-sm">
            <HiSparkles size={14} />
            <span>Services & Packaged Solutions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-poppins tracking-tight text-gray-900 dark:text-white">
            High-Impact Services Built for Growth
          </h2>
          <p className="mt-4 text-base sm:text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
            Whether you need modern full-stack web engineering, custom AI automations, viral UGC ads, or listing media enhancements—I deliver end-to-end solutions that convert.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service) => {
            const isFeatured = service.featured

            return (
              <div
                key={service.id}
                className={`relative flex flex-col justify-between rounded-3xl p-7 transition-all duration-300 hover:-translate-y-1.5 ${
                  isFeatured
                    ? 'col-span-1 md:col-span-2 lg:col-span-3 bg-gradient-to-br from-orange-500/5 via-amber-500/5 to-transparent border-2 border-orange-500/50 dark:border-orange-500/40 shadow-[0_12px_40px_-10px_rgba(249,115,22,0.2)]'
                    : 'bg-white dark:bg-[#111111] border border-gray-200/90 dark:border-white/10 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-[0_16px_32px_-8px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.7)]'
                }`}
              >
                <div>
                  {/* Top Bar: Icon & Badge */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div className="p-3.5 rounded-2xl bg-gray-100 dark:bg-white/5 border border-gray-200/60 dark:border-white/10 flex items-center justify-center shadow-inner">
                      {service.icon}
                    </div>
                    <span className={`text-[10px] sm:text-[11px] font-extrabold tracking-wider uppercase px-3 py-1 rounded-full shadow-sm ${service.badgeColor}`}>
                      {service.badge}
                    </span>
                  </div>

                  {/* Service Title */}
                  <h3 className={`font-bold font-poppins text-gray-900 dark:text-white mb-3 ${
                    isFeatured ? 'text-2xl sm:text-3xl' : 'text-xl'
                  }`}>
                    {service.title}
                  </h3>

                  {/* Summary */}
                  <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed mb-6">
                    {service.summary}
                  </p>

                  {/* Deliverables / Features List */}
                  <ul className="space-y-3 mb-6">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                        <FiCheckCircle className="text-orange-500 flex-shrink-0 mt-0.5" size={15} />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Special Bonus Box for the Airbnb Package */}
                  {service.bonus && (
                    <div className="mt-4 mb-6 p-4 rounded-2xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-orange-500/5 border border-orange-500/30 backdrop-blur-sm">
                      <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-bold text-xs sm:text-sm mb-1">
                        <FiGift size={16} />
                        <span>{service.bonus.title}</span>
                      </div>
                      <p className="text-xs text-gray-700 dark:text-gray-300 leading-relaxed">
                        {service.bonus.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Bottom Action CTA */}
                <div className="pt-5 border-t border-gray-100 dark:border-white/5 mt-auto">
                  <button
                    onClick={() => scrollToContact(service.title)}
                    className={`w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 ${
                      isFeatured
                        ? 'bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 hover:scale-[1.01]'
                        : 'bg-gray-100 dark:bg-white/5 hover:bg-orange-500 dark:hover:bg-orange-500 text-gray-900 dark:text-white hover:text-white dark:hover:text-white border border-gray-200/80 dark:border-white/10 hover:border-transparent'
                    }`}
                  >
                    <span>{service.cta}</span>
                    <FiArrowRight size={14} />
                  </button>
                </div>
              </div>
            )
          })}
        </div>

        {/* Custom Project Note */}
        <div className="mt-16 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Have a custom idea or requirement not listed above?{' '}
            <button
              onClick={() => scrollToContact('Custom Project')}
              className="text-orange-600 dark:text-orange-400 font-bold hover:underline"
            >
              Let&apos;s build a custom package for you →
            </button>
          </p>
        </div>

      </div>
    </section>
  )
}
