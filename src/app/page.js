"use client";

import dynamic from 'next/dynamic'

import Header from './components/Header'
import About from './components/About'

const SmoothScrollProvider = dynamic(() => import('./components/SmoothScrollProvider'), { ssr: false })
const Projects = dynamic(() => import('./components/Projects'))

const Contact = dynamic(() => import('./components/Contact'))
const ScrollProgress = dynamic(() => import('./components/ScrollProgress'), { ssr: false })
const TechStack = dynamic(() => import('./components/TechStack'))
const SidebarNavigation = dynamic(() => import('./components/SidebarNavigation'), { ssr: false })

export default function Home() {
  return (
    <div>
      <div className="fixed left-0 top-0 -z-10 h-full w-full"><div className="relative h-full w-full bg-slate-50 dark:bg-black transition-colors duration-300"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div><div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#ffffff1a,transparent)] hidden dark:block"></div></div></div>
      <Header />
      <ScrollProgress />
      
      <SidebarNavigation />

      <SmoothScrollProvider>
        <main className="cv-auto">
          <section id="about" className="scroll-mt-24 md:scroll-mt-28"><About /></section>
          <section id="projects" className="scroll-mt-24 md:scroll-mt-28"><Projects /></section>
          <section id="tech" className="scroll-mt-24 md:scroll-mt-28"><TechStack /></section>

          <section id="contact" className="scroll-mt-24 md:scroll-mt-28"><Contact /></section>
        </main>
      </SmoothScrollProvider>
    </div>
  );
}
