# IT Portfolio Website

## Overview

This is a modern, interactive IT portfolio website built with React and enhanced with GSAP animations. The application showcases a developer's skills, projects, and professional experience through an engaging user interface with smooth transitions and scroll-triggered animations.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React with TypeScript for type safety
- **Styling**: Tailwind CSS for responsive design and component styling
- **UI Components**: Radix UI components with shadcn/ui styling system
- **Animations**: GSAP (GreenSock Animation Platform) for smooth transitions and scroll-triggered animations
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: React Query (TanStack Query) for server state management
- **Form Handling**: React Hook Form with Zod validation

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with Drizzle ORM
- **Database Provider**: Neon Database (serverless PostgreSQL)
- **Email Service**: Nodemailer for contact form submissions
- **Development**: Vite for build tooling and development server

## Key Components

### Frontend Components
- **Hero Section**: Animated landing area with typewriter effects and smooth entrance animations
- **About Section**: Personal introduction with parallax scrolling effects
- **Skills Section**: Interactive skill bars with fill animations triggered by scroll
- **Projects Section**: Project showcase with modal overlays and hover effects
- **Experience Section**: Professional timeline with staggered animations
- **Contact Section**: Contact form with validation and email integration
- **Navigation**: Smooth scrolling navigation with responsive mobile menu

### Backend Components
- **Contact API**: Handles form submissions and email notifications
- **Database Storage**: Contact form data persistence
- **Email Service**: SMTP integration for contact notifications

## Data Flow

1. **User Interaction**: User interacts with the portfolio website
2. **Animation Triggers**: GSAP handles scroll-triggered animations and transitions
3. **Form Submission**: Contact form data is validated client-side with Zod
4. **API Request**: Form data is sent to Express backend via React Query
5. **Database Storage**: Contact information is stored in PostgreSQL via Drizzle ORM
6. **Email Notification**: Nodemailer sends email notification of new contact
7. **User Feedback**: Success/error messages displayed via toast notifications

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL database connection
- **drizzle-orm**: Type-safe database ORM
- **gsap**: Animation library for smooth transitions
- **@tanstack/react-query**: Server state management
- **react-hook-form**: Form handling and validation
- **zod**: Runtime type validation
- **nodemailer**: Email service integration

### UI Dependencies
- **@radix-ui/***: Accessible UI component primitives
- **tailwindcss**: Utility-first CSS framework
- **lucide-react**: Icon library
- **class-variance-authority**: Variant management for components

## Deployment Strategy

### Development
- **Build System**: Vite for fast development and hot module replacement
- **Type Checking**: TypeScript for compile-time type safety
- **Development Server**: Express with Vite middleware for SSR-like development experience

### Production
- **Build Process**: 
  - Frontend: Vite builds React app to static assets
  - Backend: ESBuild bundles Node.js server code
- **Static Assets**: Served from Express server
- **Database**: Neon Database (serverless PostgreSQL)
- **Environment Variables**: 
  - `DATABASE_URL`: PostgreSQL connection string
  - `SMTP_*`: Email service configuration
  - `CONTACT_EMAIL`: Recipient email for contact form

### Key Features
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance Optimized**: Code splitting and lazy loading
- **Accessibility**: ARIA-compliant components from Radix UI
- **SEO Friendly**: Proper meta tags and semantic HTML structure
- **Email Integration**: Automated contact form notifications
- **Database Persistence**: Contact form submissions stored for follow-up

The application emphasizes user experience through smooth animations, responsive design, and intuitive navigation while maintaining professional standards for code quality and performance.