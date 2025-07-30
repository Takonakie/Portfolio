import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Github, ExternalLink, Download } from 'lucide-react';
import ProjectModal from './ProjectModal';
import CardSwap, { Card } from './CardSwap';
import bitlyImage from '../assets/bitly1.png';
import bandditImage from '../assets/banddit1.png';
import lunarAIImage from '../assets/lunarAI1.png';
import autoAttendanceImage from '../assets/autoAttendance.png';
import sonaImage from '../assets/sona.jpg';
import safeImage from '../assets/safe.png';

gsap.registerPlugin(ScrollTrigger);

const projectsData = [
  {
    id: 1,
    title: 'Bitly | Food Recognition & Calorie Estimation',
    description: 'A web application that identifies food items from an image using a YOLOv8 object detection model and estimates the total calorie count.',
    image: bitlyImage,
    technologies: ['YOLOv8', 'JavaScript', 'Flask', 'Figma', 'OpenAI API'],
    github: 'https://github.com/Takonakie/Bitly-Food-Recognition',
    documentation: '/BootcampReport_Artificial Intelligence_Rivan Meinaki_LapisAI.pdf',
    detailedDescription: 'This project leverages a YOLOv8 machine learning model trained to recognize various food items, integrated into a user-friendly web interface. The backend, built with Flask, processes uploaded images, runs the detection model to identify food, and then calculates the estimated calories for the identified items. The frontend, designed in Figma and built with JavaScript, allows users to easily upload an image and view the nutritional analysis.',
    features: [
      'Image-based food recognition using a YOLOv8 model',
      'Detection of multiple food items in a single image',
      'Automatic calorie estimation for recognized foods',
      'Interactive user interface for image uploads',
      'A detailed breakdown of detected foods and their calorie counts',
      'Backend processing powered by a Flask server',
      'UI/UX designed in Figma for a clean user experience'
    ]
  },
  {
    id: 2,
    title: 'Banddit | Communication Forum',
    description: 'A modern, Reddit-style community forum built with React, TypeScript, Express.js, and MongoDB, featuring a dark theme interface with rich user interactions.',
    image: bandditImage,
    technologies: ['React', 'TypeScript', 'Express.js', 'MongoDB', 'Redux Toolkit', 'Tailwind CSS'],
    github: 'https://github.com/Takonakie/Banddit-Forum.git',
    documentation: 'null',
    detailedDescription: 'A full-stack community forum application designed for user interaction. Built with React and TypeScript for the frontend, Node.js with Express for the backend, and MongoDB for data storage. ',
    features: [
      "Secure JWT-based user authentication",
      "Post management (Create, Read, Update, Delete)",
      "Comment system with full CRUD functionality and threaded display",
      "Voting system for posts and comments",
      "Modern and responsive dark theme UI",
      "Real-time updates for post and comment interactions",
      "Input validation and authorization"
    ]
  },
  {
    id: 3,
    title: 'Lunar AI',
    description: 'A multifunctional Android AI assistant application featuring a chatbot, camera-based object recognition, a step tracker, and biometric login features.',
    image: lunarAIImage,
    technologies: ["Android (Java)", "ML Kit", "PHP", "OpenAI API"],
    github: 'https://github.com/Takonakie/LUNAR-AI.git',
    documentation: 'null',
    detailedDescription: 'A comprehensive AI assistant for Android, featuring an interactive chatbot interface, real-time image labeling using ML Kit, and fitness functionalities like a step counter. The backend is handled by PHP for user authentication.',
    features: [
      "AI Chatbot with external API integration",
      "Object recognition and image labeling using the device camera",
      "Biometric authentication (fingerprint) for secure login",
      "Step counter and fitness tracking functionality",
      "Map integration for getting directions",
      "User authentication system (login/registration) with a PHP backend",
      "Shake detection to trigger notifications"
    ]
  },
  {
    id: 4,
    title: 'Automated Attendance System using Computer Vision',
    description: 'An AI-powered system that automates student attendance using real-time face recognition, with added age and gender prediction.',
    image: autoAttendanceImage,
    technologies: ['OpenCV', 'TensorFlow', 'Keras', 'MediaPipe', 'FaceNet', 'NumPy', 'Pandas'],
    github: 'https://github.com/haysnairpa/cv-auto-attendance.git',
    documentation: '/Report Group 5 Mini-Project.pdf',
    detailedDescription: 'This project addresses the inefficiencies of traditional attendance methods by implementing an AI-powered face recognition system. It provides a contactless, efficient, and fraud-resistant solution to automate student attendance, prevent proxy attendance, and minimize human error. The system also predicts age and gender, offering valuable downloadgraphic insights for educational institutions.',
    features: [
      'Automated attendance via real-time face recognition',
      'Student age and gender prediction',
      'Secure facial data capture and registration',
      'Generates timestamped attendance records (CSV)',
      'Fraud-resistant to prevent proxy attendance',
      'Identifies and labels unknown individuals',
      'Contactless and hygienic operation'
    ]
  },
  {
    id: 5,
    title: 'SONA | Digital Image Processing',
    description: 'A comprehensive digital image processing application built with Python and Flet, offering a wide range of tools for image manipulation and analysis.',
    image: sonaImage,
    technologies: ["Python", "Flet", "OpenCV", "Pillow", "NumPy"],
    github: 'https://github.com/haysnairpa/image_processing_project.git',
    documentation: '/Image Processing and Recognition group 7 task.pdf',
    detailedDescription: 'SONA is a powerful and user-friendly desktop application for digital image processing. Built with Python and the Flet framework, it provides an interactive interface for users to perform a variety of operations, from basic photo editing and filtering to more complex tasks like image stitching, background removal, and mathematical transformations. The project leverages core libraries such as OpenCV and Pillow for robust image manipulation capabilities.',
    features: [
      "Comprehensive Photo Editor with crop, rotate, scale, and flip functionalities",
      "Advanced Color and Tone Adjustments including brightness, contrast, and gamma correction",
      "A wide variety of image filters, such as Gaussian, Median, Sobel, and Canny edge detection",
      "Image Enhancement techniques like Histogram Equalization and Contrast Stretching",
      "Mathematical Operations on images including addition, subtraction, and bitwise logic (AND, OR, XOR)",
      "Photo Stitching to seamlessly create panoramic images",
      "Intelligent Background Removal using Thresholding and KMeans clustering",
      "Image Compression using Run-Length Encoding (RLE) and Discrete Cosine Transform (DCT)",
      "Morphological transformations like dilation, erosion, opening, and closing"
    ]
  },
  {
    id: 6,
    title: 'SAFE | Fall Detection System for Elderly',
    description: 'An AI-powered system that detects fall incidents in the elderly in real-time using computer vision and sends emergency alerts.',
    image: safeImage,
    technologies: ["Elice ML API", "React.js", "Express.js", "AWS", "YOLOv8", "Twilio"],
    github: '',
    documentation: 'null',
    detailedDescription: 'SAFE is an intelligent monitoring system designed to enhance the safety of elderly individuals living independently. Using real-time video analysis, the system can accurately identify fall incidents and automatically send an alert to an admin dashboard. An admin can then verify the event and trigger an automated phone call or SMS to a registered caregiver, ensuring that emergency assistance is dispatched promptly.',
    features: [
      "Real-time fall detection using AI and Computer Vision.",
      "Instant emergency notifications to an admin dashboard.",
      "Automated emergency calls to caregivers via API integration (e.g., Twilio).",
      "Registration and profile management system for the elderly and caregivers.",
      "Graph visualization of elderly's daily vital.",
      "High accuracy to minimize false alarms."
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
    <section id="projects" className="py-10 bg-secondary">
      <div className="container mx-auto px-6">
        <div className='flex flex-col lg:flex-row lg:justify-between lg:mt-40'>
          <div className='flex flex-col items-center gap-4 mt-10'>
            <h2 className="projects-title text-4xl md:text-5xl font-bold text-center opacity-0">
              Featured <span className="text-accent">Projects</span>
            </h2>
            <h3 className="projects-title flex flex-col w-70 mb-10 sm:mb-20 md:mb-60 opacity-0">
              The following are projects I have completed to date, <span> encompassing both Machine Learning and Web Development. </span> 
            </h3>
          </div>
          <div className='projects-title h-[200px] mr-[185px] sm:mr-[280px] md:mr-[250px] lg:mr-[150px] mb-[150px]'>
            <CardSwap
                cardDistance={60}
                verticalDistance={50}
                delay={5000}
                pauseOnHover={false}
            >
                <Card>
                <img src={bitlyImage} alt="Card1" />
                </Card>
                <Card>
                <img src={bandditImage} alt="Card2" />
                </Card>
                <Card>
                <img src={lunarAIImage} alt="Card3" />
                </Card>
            </CardSwap>
          </div>
        </div>
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
                    href={project.documentation}
                    download // <-- Solusinya
                    className="text-accent hover:text-accent/80 transition-colors duration-300"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {/* Logika untuk menampilkan ikon bisa tetap sama */}
                    {project.documentation ? <Download size={20} /> : <ExternalLink size={20} />}
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
