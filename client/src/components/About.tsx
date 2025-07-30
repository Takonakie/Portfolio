import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import profileImage from '../assets/profile.jpg';

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
                As a Software Developer & Machine Learning Engineer , I am passionate about building innovative and impactful solutions. 
              </p>
              <p className="text-lg text-muted mb-6 leading-relaxed">
                Driven by a curiosity for new technologies, I excel at solving complex challenges and thrive in fast-paced, deadline-driven environments.
              </p>
              <div className="flex flex-wrap gap-4">
                <span className="px-4 py-2 bg-accent/20 text-accent rounded-lg font-mono text-sm">Problem Solver</span>
                <span className="px-4 py-2 bg-accent/20 text-accent rounded-lg font-mono text-sm">Team Player</span>
                <span className="px-4 py-2 bg-accent/20 text-accent rounded-lg font-mono text-sm">Lifelong Learner</span>
              </div>
            </div>
            <div className="about-image opacity-0">
              <img 
                src={profileImage}
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
