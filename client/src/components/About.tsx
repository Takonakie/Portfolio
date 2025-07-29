import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  useEffect(() => {
    gsap.fromTo('.about-title', 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-title',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo('.about-text', 
      { x: -50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-text',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

    gsap.fromTo('.about-image', 
      { x: 50, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.about-image',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  }, []);

  return (
    <section id="about" className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl mx-auto">
          <h2 className="about-title text-4xl md:text-5xl font-bold text-center mb-16 opacity-0">
            About <span className="text-accent">Me</span>
          </h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="about-text opacity-0">
              <p className="text-lg text-muted mb-6 leading-relaxed">
                I'm a passionate Full Stack Developer with 5+ years of experience creating digital experiences that make a difference. I specialize in building scalable web applications using modern technologies like React, Node.js, and Python.
              </p>
              <p className="text-lg text-muted mb-6 leading-relaxed">
                When I'm not coding, you'll find me exploring new technologies, contributing to open-source projects, or sharing my knowledge through technical writing and mentoring.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="px-4 py-2 bg-accent/20 text-accent rounded-lg font-mono text-sm">Problem Solver</span>
                <span className="px-4 py-2 bg-accent/20 text-accent rounded-lg font-mono text-sm">Team Player</span>
                <span className="px-4 py-2 bg-accent/20 text-accent rounded-lg font-mono text-sm">Lifelong Learner</span>
              </div>
            </div>
            <div className="about-image opacity-0">
              <img 
                src="/assets/profile.jpg" 
                alt="John Doe - Full Stack Developer" 
                className="rounded-2xl shadow-2xl w-full h-auto transform hover:scale-105 transition-transform duration-300" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
