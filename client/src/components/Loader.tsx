import { useEffect, useState } from 'react';
import { gsap } from 'gsap';

export default function Loader() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      const loader = document.getElementById('loader');
      if (loader) {
        gsap.to(loader, {
          opacity: 0,
          duration: 0.5,
          ease: 'power2.out',
          onComplete: () => setIsVisible(false)
        });
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      id="loader" 
      className="fixed inset-0 bg-primary z-50 flex items-center justify-center"
    >
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
        <p className="mt-4 text-accent font-mono">Loading Portfolio...</p>
      </div>
    </div>
  );
}
