import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const useScrollTrigger = (
  selector: string,
  animation: object,
  options?: ScrollTrigger.Vars
) => {
  useEffect(() => {
    const element = document.querySelector(selector);
    
    if (element) {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse',
          ...options
        }
      });
      
      tl.fromTo(element, animation, { duration: 1, ease: 'power2.out' });
      
      return () => {
        tl.kill();
      };
    }
  }, [selector, animation, options]);
};
