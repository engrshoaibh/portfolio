"use client";

import dynamic from 'next/dynamic'

import Header from './components/Header'
import About from './components/About'

const SmoothScrollProvider = dynamic(() => import('./components/SmoothScrollProvider'), { ssr: false })
const Projects = dynamic(() => import('./components/Projects'))
const Services = dynamic(() => import('./components/Services'))
const TechStack = dynamic(() => import('./components/TechStack'))
const Contact = dynamic(() => import('./components/Contact'))
const ScrollProgress = dynamic(() => import('./components/ScrollProgress'), { ssr: false })
const SidebarNavigation = dynamic(() => import('./components/SidebarNavigation'), { ssr: false })

export default function Home() {
  return (
    <div className="relative min-h-screen text-gray-900 dark:text-gray-100 transition-colors duration-300">
      {/* Background with modern grid */}
      <div className="fixed left-0 top-0 -z-10 h-full w-full pointer-events-none">
        <div className="relative h-full w-full bg-slate-50 dark:bg-[#070708] transition-colors duration-300">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#cbd5e135_1px,transparent_1px),linear-gradient(to_bottom,#cbd5e135_1px,transparent_1px)] dark:bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff08_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_75%_65%_at_50%_0%,#000_70%,transparent_100%)]"></div>
          <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-b from-orange-400/10 dark:from-orange-500/10 via-transparent to-transparent blur-3xl pointer-events-none"></div>
        </div>
      </div>

      <Header />
      <ScrollProgress />
      <SidebarNavigation />

      <SmoothScrollProvider>
        <main className="relative z-10 w-full">
          <section id="about" className="scroll-mt-24 md:scroll-mt-28">
            <About />
          </section>
          
          <section id="projects" className="scroll-mt-24 md:scroll-mt-28">
            <Projects />
          </section>
          
          <section id="services" className="scroll-mt-24 md:scroll-mt-28">
            <Services />
          </section>

          <section id="tech" className="scroll-mt-24 md:scroll-mt-28">
            <TechStack />
          </section>

          <section id="contact" className="scroll-mt-24 md:scroll-mt-28">
            <Contact />
          </section>
        </main>
      </SmoothScrollProvider>
    </div>
  );
}
