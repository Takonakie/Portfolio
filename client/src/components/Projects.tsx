import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink } from 'lucide-react';
import ProjectModal from './ProjectModal';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: 1,
    title: 'E-commerce Platform',
    description: 'Full-stack e-commerce solution with React, Node.js, and Stripe integration. Features include user authentication, product management, and payment processing.',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
    technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    github: 'https://github.com/johndoe/ecommerce-platform',
    demo: 'https://ecommerce-demo.com',
    detailedDescription: 'A comprehensive e-commerce platform built with modern web technologies. Features include user authentication, product catalog, shopping cart, payment processing with Stripe, order management, and admin dashboard.',
    features: [
      'User authentication and authorization',
      'Product catalog with search and filtering',
      'Shopping cart and checkout process',
      'Payment processing with Stripe',
      'Order management system',
      'Admin dashboard for product management',
      'Responsive design for mobile and desktop'
    ]
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
    technologies: ['React', 'TypeScript', 'Socket.io', 'PostgreSQL'],
    github: 'https://github.com/johndoe/task-manager',
    demo: 'https://taskmanager-demo.com',
    detailedDescription: 'A collaborative task management application designed for teams. Built with React and TypeScript for the frontend, Node.js for the backend, and PostgreSQL for data storage.',
    features: [
      'Real-time collaboration with Socket.io',
      'Drag-and-drop task management',
      'Team workspace management',
      'Task assignment and tracking',
      'Project timeline visualization',
      'Notification system',
      'File attachments and comments'
    ]
  },
  {
    id: 3,
    title: 'Analytics Dashboard',
    description: 'Advanced analytics dashboard with interactive charts, real-time data visualization, and customizable reporting features.',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
    technologies: ['React', 'D3.js', 'Python', 'Redis'],
    github: 'https://github.com/johndoe/analytics-dashboard',
    demo: 'https://analytics-demo.com',
    detailedDescription: 'A comprehensive analytics dashboard for data visualization and reporting. Features interactive charts, real-time data updates, and customizable dashboards.',
    features: [
      'Interactive data visualizations with D3.js',
      'Real-time data streaming',
      'Customizable dashboard layouts',
      'Export and sharing capabilities',
      'Multi-tenant support',
      'API integration for data sources',
      'Mobile-responsive design'
    ]
  },
  {
    id: 4,
    title: 'Real-time Chat App',
    description: 'Modern chat application with real-time messaging, file sharing, group chats, and end-to-end encryption.',
    image: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
    technologies: ['React Native', 'Socket.io', 'Firebase', 'Express'],
    github: 'https://github.com/johndoe/chat-app',
    demo: 'https://chat-demo.com',
    detailedDescription: 'A modern real-time chat application built with React Native for cross-platform mobile support. Features include real-time messaging, file sharing, and group chats.',
    features: [
      'Real-time messaging with Socket.io',
      'File and image sharing',
      'Group chat functionality',
      'Push notifications',
      'Message encryption',
      'User presence indicators',
      'Cross-platform mobile support'
    ]
  },
  {
    id: 5,
    title: 'AI Content Generator',
    description: 'AI-powered content generation tool with natural language processing, template customization, and multi-format output support.',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
    technologies: ['Python', 'TensorFlow', 'FastAPI', 'OpenAI'],
    github: 'https://github.com/johndoe/ai-content-generator',
    demo: 'https://ai-content-demo.com',
    detailedDescription: 'An AI-powered content generation tool that leverages natural language processing to create high-quality content. Built with Python, TensorFlow, and OpenAI API.',
    features: [
      'AI-powered content generation',
      'Multiple content formats support',
      'Template customization',
      'Batch processing capabilities',
      'API integration with OpenAI',
      'Content quality scoring',
      'Export in multiple formats'
    ]
  },
  {
    id: 6,
    title: 'DevOps Pipeline',
    description: 'Automated CI/CD pipeline with Docker containerization, Kubernetes orchestration, and monitoring dashboard.',
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=400',
    technologies: ['Docker', 'Kubernetes', 'Jenkins', 'AWS'],
    github: 'https://github.com/johndoe/devops-pipeline',
    demo: 'https://devops-demo.com',
    detailedDescription: 'A complete DevOps pipeline solution with automated testing, building, and deployment. Features Docker containerization, Kubernetes orchestration, and comprehensive monitoring.',
    features: [
      'Automated CI/CD with Jenkins',
      'Docker containerization',
      'Kubernetes orchestration',
      'Infrastructure as Code',
      'Monitoring and logging',
      'Automated testing pipelines',
      'Multi-environment deployments'
    ]
  }
];

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<typeof projectsData[0] | null>(null);

  useEffect(() => {
    gsap.fromTo('.projects-title', 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.projects-title',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

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
  }, []);

  return (
    <section id="projects" className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <h2 className="projects-title text-4xl md:text-5xl font-bold text-center mb-16 opacity-0">
          Featured <span className="text-accent">Projects</span>
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projectsData.map((project) => (
            <div 
              key={project.id}
              className="project-card opacity-0 bg-primary rounded-2xl overflow-hidden shadow-2xl transform hover:scale-105 transition-all duration-300 hover:shadow-accent/20 cursor-pointer"
              onClick={() => setSelectedProject(project)}
            >
              <img 
                src={project.image} 
                alt={project.title} 
                className="w-full h-48 object-cover" 
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-muted mb-4">{project.description}</p>
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
                    className="text-accent hover:text-accent/80 transition-colors duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <Github size={20} />
                  </a>
                  <a 
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-accent hover:text-accent/80 transition-colors duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <ExternalLink size={20} />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </section>
  );
}
