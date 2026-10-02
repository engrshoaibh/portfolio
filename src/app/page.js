
import dynamic from 'next/dynamic'

import Header from './components/Header'
import About from './components/About'
import FadeContent from '@/components/FadeContent'

const CustomCursor = dynamic(() => import('./components/CustomCursor'), { ssr: false })
const SmoothScrollProvider = dynamic(() => import('./components/SmoothScrollProvider'), { ssr: false })
const Projects = dynamic(() => import('./components/Projects'))
const Services = dynamic(() => import('./components/Services'))
const Contact = dynamic(() => import('./components/Contact'))
const ScrollProgress = dynamic(() => import('./components/ScrollProgress'), { ssr: false })
const TechStack = dynamic(() => import('./components/TechStack'))
const SidebarNavigation = dynamic(() => import('./components/SidebarNavigation'), { ssr: false })

export default function Home() {
  return (
    <div>
      <CustomCursor />
      <div className="fixed left-0 top-0 -z-10 h-full w-full"><div className="relative h-full w-full bg-black"><div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div><div className="absolute left-0 right-0 top-[-10%] h-[1000px] w-[1000px] rounded-full bg-[radial-gradient(circle_400px_at_50%_300px,#fbfbfb36,#000)]"></div></div></div>
      <Header />
      <ScrollProgress />
      
      <SidebarNavigation />

      <SmoothScrollProvider>
        <main className="lg:pl-64">
          <section data-scroll-section id="about" className="scroll-mt-24 md:scroll-mt-28">
            <FadeContent container="[data-scroll-container]" blur duration={900} threshold={0.15}>
              <About />
            </FadeContent>
          </section>
          <section data-scroll-section id="projects" className="scroll-mt-24 md:scroll-mt-28">
            <FadeContent container="[data-scroll-container]" blur duration={900} threshold={0.12}>
              <Projects />
            </FadeContent>
          </section>
          <section data-scroll-section id="tech" className="scroll-mt-24 md:scroll-mt-28">
            <FadeContent container="[data-scroll-container]" blur duration={900} threshold={0.12}>
              <TechStack />
            </FadeContent>
          </section>
          <section data-scroll-section id="services" className="scroll-mt-24 md:scroll-mt-28">
            <FadeContent container="[data-scroll-container]" blur duration={900} threshold={0.12}>
              <Services />
            </FadeContent>
          </section>
          <section data-scroll-section id="contact" className="scroll-mt-24 md:scroll-mt-28">
            <FadeContent container="[data-scroll-container]" blur duration={900} threshold={0.12}>
              <Contact />
            </FadeContent>
          </section>
        </main>
      </SmoothScrollProvider>
    </div>
  );
}
