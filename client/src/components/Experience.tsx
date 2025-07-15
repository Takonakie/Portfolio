import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experienceData = [
  {
    title: 'Senior Full Stack Developer',
    company: 'TechCorp Solutions Inc.',
    period: '2022 - Present',
    description: [
      'Led development of 5+ full-stack applications using React, Node.js, and MongoDB',
      'Mentored junior developers and established code review processes',
      'Implemented CI/CD pipelines improving deployment efficiency by 40%'
    ]
  },
  {
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    period: '2020 - 2022',
    description: [
      'Developed responsive web applications using React and Express.js',
      'Collaborated with design team to implement pixel-perfect UI components',
      'Optimized application performance resulting in 60% faster load times'
    ]
  },
  {
    title: 'Frontend Developer',
    company: 'WebDev Agency',
    period: '2019 - 2020',
    description: [
      'Built modern, responsive websites using HTML5, CSS3, and JavaScript',
      'Implemented interactive animations and micro-interactions',
      'Maintained cross-browser compatibility and accessibility standards'
    ]
  }
];

export default function Experience() {
  useEffect(() => {
    gsap.fromTo('.experience-title', 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.experience-title',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

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
  }, []);

  return (
    <section id="experience" className="py-20 bg-primary">
      <div className="container mx-auto px-6">
        <h2 className="experience-title text-4xl md:text-5xl font-bold text-center mb-16 opacity-0">
          Work <span className="text-accent">Experience</span>
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 w-0.5 h-full bg-accent/30"></div>
            
            {experienceData.map((item, index) => (
              <div key={index} className="experience-item opacity-0 relative flex items-start mb-12">
                <div className="absolute left-6 w-4 h-4 bg-accent rounded-full border-4 border-primary"></div>
                <div className="ml-16 bg-secondary p-6 rounded-lg shadow-lg hover:shadow-accent/20 transition-all duration-300">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <span className="text-accent font-mono text-sm">{item.period}</span>
                  </div>
                  <p className="text-muted mb-3">{item.company}</p>
                  <ul className="text-muted space-y-2">
                    {item.description.map((desc, descIndex) => (
                      <li key={descIndex} className="flex items-start">
                        <ChevronRight className="text-accent text-xs mt-1.5 mr-3 flex-shrink-0" size={12} />
                        {desc}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
