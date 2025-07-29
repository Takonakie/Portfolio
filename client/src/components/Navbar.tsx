import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { gsap } from 'gsap';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const navbar = document.querySelector('.navbar');
    gsap.fromTo(navbar, 
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: 0.5 }
    );
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled ? 'bg-primary/95 backdrop-blur-md' : 'bg-transparent'
    } border-b border-border`}>
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <button 
          onClick={() => scrollToSection('home')}
          className="text-xl font-bold text-accent font-mono hover:scale-105 transition-transform"
        >
          Rivan Meinaki
        </button>
        
        <div className="hidden md:flex space-x-8">
          {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((section) => (
            <button
              key={section}
              onClick={() => scrollToSection(section)}
              className="nav-link hover:text-accent transition-colors duration-300 capitalize"
            >
              {section}
            </button>
          ))}
        </div>
        
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="md:hidden text-accent hover:scale-105 transition-transform"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-secondary border-t border-border">
          <div className="container mx-auto px-6 py-4 space-y-4">
            {['home', 'about', 'skills', 'projects', 'experience', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => scrollToSection(section)}
                className="block w-full text-left hover:text-accent transition-colors duration-300 capitalize"
              >
                {section}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
