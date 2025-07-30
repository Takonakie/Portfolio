import { useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { gsap } from 'gsap';

export default function Hero() {
  useEffect(() => {
    const heroTimeline = gsap.timeline({ delay: 1.5 });
    
    heroTimeline
      .fromTo('.hero-title', 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
      )
      .fromTo('.hero-subtitle', 
        { y: 30, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' }, 
        '-=0.5'
      )
      .fromTo('.hero-buttons', 
        { y: 20, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }, 
        '-=0.3'
      );
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-secondary to-primary"></div>
      <div className="container mx-auto px-6 text-center relative z-10">
        <div className="hero-content">
          <h1 className="hero-title text-5xl md:text-7xl font-bold mb-6 opacity-0">
            Hi, I'm <span className="text-accent">Rivan Meinaki</span>
          </h1>
          <p className="hero-subtitle text-xl md:text-2xl text-muted mb-8 opacity-0 font-mono">
            Software Developer & Machine Learning Engineer
          </p>
          <div className="hero-buttons flex flex-col sm:flex-row gap-4 justify-center items-center opacity-0">
            <button
              onClick={() => scrollToSection('projects')}
              className="btn-primary px-8 py-3 rounded-lg font-semibold"
            >
              View My Work
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="btn-secondary px-8 py-3 rounded-lg font-semibold"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-accent" size={32} />
      </div>
    </section>
  );
}
