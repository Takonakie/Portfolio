import { useEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, MapPin, Github, Linkedin, Twitter } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';

gsap.registerPlugin(ScrollTrigger);

const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export default function Contact() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
    },
  });

  const contactMutation = useMutation({
    mutationFn: (data: ContactFormData) => 
      apiRequest('POST', '/api/contact', data),
    onSuccess: () => {
      toast({
        title: 'Message sent successfully!',
        description: "Thank you for your message. I'll get back to you soon.",
      });
      form.reset();
    },
    onError: (error: any) => {
      toast({
        title: 'Failed to send message',
        description: error.message || 'Please try again later.',
        variant: 'destructive',
      });
    },
    onSettled: () => {
      setIsSubmitting(false);
    },
  });

  const onSubmit = (data: ContactFormData) => {
    setIsSubmitting(true);
    contactMutation.mutate(data);
  };

  useEffect(() => {
    gsap.fromTo('.contact-title', 
      { y: 50, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.contact-title',
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: 'play none none reverse'
        }
      }
    );

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
  }, []);

  return (
    <section id="contact" className="py-20 bg-secondary">
      <div className="container mx-auto px-6">
        <h2 className="contact-title text-4xl md:text-5xl font-bold text-center mb-16 opacity-0">
          Get In <span className="text-accent">Touch</span>
        </h2>
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="contact-info opacity-0">
              <h3 className="text-2xl font-semibold mb-6">Let's Connect</h3>
              <p className="text-muted mb-8 text-lg">
                I'm always interested in hearing about new opportunities and exciting projects. 
                Feel free to reach out if you'd like to collaborate or just say hello!
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <Mail className="text-accent text-xl w-8" />
                  <span className="ml-4 text-lg">john.doe@email.com</span>
                </div>
                <div className="flex items-center">
                  <Phone className="text-accent text-xl w-8" />
                  <span className="ml-4 text-lg">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="text-accent text-xl w-8" />
                  <span className="ml-4 text-lg">San Francisco, CA</span>
                </div>
              </div>
              <div className="flex space-x-6 mt-8">
                <a 
                  href="https://linkedin.com/in/johndoe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link text-accent hover:text-accent/80 transition-colors duration-300 transform hover:scale-110"
                >
                  <Linkedin size={24} />
                </a>
                <a 
                  href="https://github.com/johndoe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link text-accent hover:text-accent/80 transition-colors duration-300 transform hover:scale-110"
                >
                  <Github size={24} />
                </a>
                <a 
                  href="https://twitter.com/johndoe"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="social-link text-accent hover:text-accent/80 transition-colors duration-300 transform hover:scale-110"
                >
                  <Twitter size={24} />
                </a>
              </div>
            </div>

            {/* Contact Form */}
            <div className="contact-form opacity-0">
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div>
                  <Label htmlFor="name" className="block text-sm font-medium mb-2">Name</Label>
                  <Input 
                    id="name"
                    {...form.register('name')}
                    className="w-full px-4 py-3 bg-primary border border-input rounded-lg focus:outline-none focus:border-accent transition-colors duration-300"
                    placeholder="Your name"
                  />
                  {form.formState.errors.name && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.name.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="email" className="block text-sm font-medium mb-2">Email</Label>
                  <Input 
                    id="email"
                    type="email"
                    {...form.register('email')}
                    className="w-full px-4 py-3 bg-primary border border-input rounded-lg focus:outline-none focus:border-accent transition-colors duration-300"
                    placeholder="your.email@example.com"
                  />
                  {form.formState.errors.email && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.email.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="subject" className="block text-sm font-medium mb-2">Subject</Label>
                  <Input 
                    id="subject"
                    {...form.register('subject')}
                    className="w-full px-4 py-3 bg-primary border border-input rounded-lg focus:outline-none focus:border-accent transition-colors duration-300"
                    placeholder="Project inquiry"
                  />
                  {form.formState.errors.subject && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.subject.message}</p>
                  )}
                </div>
                
                <div>
                  <Label htmlFor="message" className="block text-sm font-medium mb-2">Message</Label>
                  <Textarea 
                    id="message"
                    {...form.register('message')}
                    rows={4}
                    className="w-full px-4 py-3 bg-primary border border-input rounded-lg focus:outline-none focus:border-accent transition-colors duration-300 resize-none"
                    placeholder="Tell me about your project..."
                  />
                  {form.formState.errors.message && (
                    <p className="text-red-500 text-sm mt-1">{form.formState.errors.message.message}</p>
                  )}
                </div>
                
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-accent-foreground font-semibold py-3 rounded-lg hover:bg-accent/90 transition-all duration-300 transform hover:scale-105"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
