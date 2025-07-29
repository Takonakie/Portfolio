import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Code, 
  Database, 
  Server, 
  Palette,
  Atom, 
  GitBranch, 
  Container,
  Cloud,
  Zap,
  Figma,
  BrainCircuit,
  Terminal
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skillsData = {
  machinelearning: [
    { name: 'Python', percentage: 90 },
    { name: 'Computer Vision', percentage: 85 },
    { name: 'Data Analysis', percentage: 95 },
    { name: 'Natural Language Processing', percentage: 80 },
    { name: 'Deep Learning', percentage: 80 }
  ],
  webdeveloper: [
    { name: 'React.js', percentage: 88 },
    { name: 'Express.js', percentage: 82 },
    { name: 'JavaScript', percentage: 85 },
    { name: 'MySQL', percentage: 78 },
    { name: 'MongoDB', percentage: 78 }
  ]
};

const tools = [
  { name: 'React.js', icon: Atom },
  { name: 'Tensorflow', icon: BrainCircuit },
  { name: 'Docker', icon: Container },
  { name: 'AWS', icon: Cloud },
  { name: 'Git & GitHub', icon: GitBranch },
  { name: 'VS Code', icon: Code }
];

export default function Skills() {
  useEffect(() => {
    gsap.fromTo('.skills-title', 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.skills-title',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

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

    gsap.fromTo('.tools-section', 
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.tools-section',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

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

    // Animate skill bars
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
  }, []);

  return (
    <section id="skills" className="py-20 bg-primary">
      <div className="container mx-auto px-6">
        <h2 className="skills-title text-4xl md:text-5xl font-bold text-center mb-16 opacity-0">
          Technical <span className="text-accent">Skills</span>
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Machine Learning Skills */}
            <div className="skill-category opacity-0">
              <h3 className="text-2xl font-semibold mb-6 text-accent">Machine Learning</h3>
              <div className="space-y-4">
                {skillsData.machinelearning.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-accent font-mono">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        className="skill-bar bg-accent h-2 rounded-full" 
                        style={{ width: '0%' }}
                        data-width={`${skill.percentage}%`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Web Developer Skills */}
            <div className="skill-category opacity-0">
              <h3 className="text-2xl font-semibold mb-6 text-accent">Web Developer</h3>
              <div className="space-y-4">
                {skillsData.webdeveloper.map((skill, index) => (
                  <div key={index} className="skill-item">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-accent font-mono">{skill.percentage}%</span>
                    </div>
                    <div className="w-full bg-slate-700 rounded-full h-2">
                      <div 
                        className="skill-bar bg-accent h-2 rounded-full" 
                        style={{ width: '0%' }}
                        data-width={`${skill.percentage}%`}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Tools & Technologies */}
          <div className="tools-section mt-12 text-center opacity-0">
            <h3 className="text-2xl font-semibold mb-8 text-accent">Tools & Technologies</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
              {tools.map((tool, index) => {
                const Icon = tool.icon;
                return (
                  <div key={index} className="tool-item p-4 bg-secondary rounded-lg hover:bg-accent/20 transition-all duration-300 transform hover:scale-105">
                    <Icon className="text-3xl text-accent mb-2 mx-auto" />
                    <p className="text-sm font-mono">{tool.name}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
