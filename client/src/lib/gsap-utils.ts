import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const initGSAP = () => {
  // Hero animations
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

  // Section animations
  gsap.fromTo('.section-title', 
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.section-title',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // About section
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

  // Skills animation
  gsap.fromTo('.skill-category', 
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.skill-category',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Project cards
  gsap.fromTo('.project-card', 
    { y: 50, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.15,
      scrollTrigger: {
        trigger: '.project-card',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Experience items
  gsap.fromTo('.experience-item', 
    { x: -30, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power2.out',
      stagger: 0.2,
      scrollTrigger: {
        trigger: '.experience-item',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Contact section
  gsap.fromTo('.contact-info', 
    { x: -50, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.contact-info',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  gsap.fromTo('.contact-form', 
    { x: 50, opacity: 0 },
    {
      x: 0,
      opacity: 1,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.contact-form',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  // Tools section
  gsap.fromTo('.tool-item', 
    { y: 30, opacity: 0 },
    {
      y: 0,
      opacity: 1,
      duration: 0.6,
      ease: 'power2.out',
      stagger: 0.1,
      scrollTrigger: {
        trigger: '.tool-item',
        start: 'top 80%',
        end: 'bottom 20%',
        toggleActions: 'play none none reverse'
      }
    }
  );

  return heroTimeline;
};

export const animateSkillBars = () => {
  const skillBars = document.querySelectorAll('.skill-bar');
  
  skillBars.forEach((bar, index) => {
    const element = bar as HTMLElement;
    const width = element.dataset.width || '0%';
    
    gsap.fromTo(element, 
      { width: '0%' },
      {
        width: width,
        duration: 1.5,
        ease: 'power2.out',
        delay: index * 0.2,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );
  });
};

export const animateNavbar = () => {
  const navbar = document.querySelector('.navbar');
  
  gsap.fromTo(navbar, 
    { y: -100, opacity: 0 },
    { y: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: 0.5 }
  );
};
