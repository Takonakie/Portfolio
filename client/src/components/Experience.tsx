import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experienceData = [
  {
    title: 'Vice Head of Sport, Passion, & Talent',
    company: 'PUMA Informatics',
    period: '2024 - Present',
    description: [
      "Coordinated and organized various sports events and competitions for Informatics students.",
      "Identified and nurtured student talent in non-academic fields.",
      "Responsible for team formation and participation in external competitions."
    ]
  },
  {
    title: 'Vice Head of Sport & Art',
    company: 'KMB Ashokavardhana',
    period: '2024 - Present',
    description: [
      "Designed and executed sports and arts programs for organization members.",
      "Fostered member participation in creative and athletic activities to build camaraderie.",
      "Managed logistics and schedules for routine practices and special events."
    ]
  },
  {
    title: 'Head of Public Relations',
    company: 'PUBA',
    period: '2024 - Present',
    description: [
      "Managed the organization's public image and communications across social media and other channels.",
      "Built and maintained relationships with other student organizations, sponsors, and media partners.",
      "Created and distributed promotional materials such as posters, press releases, and digital content."
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
          Organizational <span className="text-accent">Experience</span>
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
