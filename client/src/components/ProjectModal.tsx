import { useEffect } from 'react';
import { X, Github, ExternalLink } from 'lucide-react';
import { gsap } from 'gsap';

interface ProjectModalProps {
  project: {
    id: number;
    title: string;
    description: string;
    image: string;
    technologies: string[];
    github: string;
    demo: string;
    detailedDescription: string;
    features: string[];
  };
  onClose: () => void;
}

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
  useEffect(() => {
    // Animate modal entrance
    gsap.fromTo('.modal-backdrop', 
      { opacity: 0 },
      { opacity: 1, duration: 0.3, ease: 'power2.out' }
    );
    
    gsap.fromTo('.modal-content', 
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.4, ease: 'power2.out', delay: 0.1 }
    );

    // Prevent body scroll
    document.body.style.overflow = 'hidden';
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    gsap.to('.modal-backdrop', {
      opacity: 0,
      duration: 0.3,
      ease: 'power2.out',
      onComplete: onClose
    });
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div 
      className="modal-backdrop fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className="modal-content bg-secondary rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-2xl font-bold">{project.title}</h3>
            <button 
              onClick={handleClose}
              className="text-accent hover:text-accent/80 transition-colors duration-300"
            >
              <X size={24} />
            </button>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div>
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-64 object-cover rounded-lg mb-4" 
              />
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies.map((tech, index) => (
                  <span 
                    key={index}
                    className="px-3 py-1 bg-accent/20 text-accent rounded-full text-sm font-mono"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a 
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors duration-300"
                >
                  <Github size={20} />
                  <span>GitHub</span>
                </a>
                <a 
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-accent hover:text-accent/80 transition-colors duration-300"
                >
                  <ExternalLink size={20} />
                  <span>Live Demo</span>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-semibold mb-4">About This Project</h4>
              <p className="text-muted mb-6 leading-relaxed">
                {project.detailedDescription}
              </p>
              
              <h4 className="text-xl font-semibold mb-4">Key Features</h4>
              <ul className="space-y-2">
                {project.features.map((feature, index) => (
                  <li key={index} className="flex items-start text-muted">
                    <span className="text-accent mr-2">•</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
