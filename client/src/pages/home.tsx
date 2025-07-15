import { useEffect } from 'react';
import Layout from '@/components/Layout';
import Loader from '@/components/Loader';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Skills from '@/components/Skills';
import Projects from '@/components/Projects';
import ProjectShowcase from '@/components/ProjectShowcase';
import Experience from '@/components/Experience';
import Contact from '@/components/Contact';

export default function Home() {
  useEffect(() => {
    // Smooth scrolling for the page
    document.documentElement.style.scrollBehavior = 'smooth';
    
    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <>
      <Loader />
      <Layout>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <ProjectShowcase />
        <Experience />
        <Contact />
      </Layout>
    </>
  );
}
