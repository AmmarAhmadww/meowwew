'use client'; // Required for form handling, hooks, and GSAP

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import dynamic from 'next/dynamic';

const Logo3D = dynamic(() => import('@/components/Logo3D'), { ssr: false });

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <input
        ref={ref}
        className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

const Textarea = React.forwardRef<HTMLTextAreaElement, React.TextareaHTMLAttributes<HTMLTextAreaElement>>(
  ({ className, ...props }, ref) => {
    return (
      <textarea
        ref={ref}
        className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
        {...props}
      />
    );
  }
);
Textarea.displayName = 'Textarea';

const Button = React.forwardRef<HTMLButtonElement, React.ButtonHTMLAttributes<HTMLButtonElement>>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';


export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const formRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);
  const messageTextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const inputs = [nameInputRef.current, emailInputRef.current, messageTextareaRef.current];
    inputs.forEach(input => {
      if (!input) return;
      const tl = gsap.timeline({ paused: true });
      tl.to(input, { scale: 1.02, borderColor: '#3b82f6', duration: 0.3, ease: 'power2.out' }); // Example: scale and blue border

      input.addEventListener('focus', () => tl.play());
      input.addEventListener('blur', () => tl.reverse());

      return () => {
        input.removeEventListener('focus', () => tl.play());
        input.removeEventListener('blur', () => tl.reverse());
        if (tl.isActive()) tl.kill();
      };
    });
  }, []);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setStatusMessage('');

    const endpoint = process.env.NEXT_PUBLIC_CONTACT_FORM_ENDPOINT;
    if (!endpoint) {
        console.error("Contact form endpoint URL is not defined in .env");
        setStatus('error');
        setStatusMessage('Configuration error. Please contact support.');
        return;
    }

    try {
      console.log('Submitting to:', endpoint);
      console.log('Data:', formData);

      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      const success = Math.random() > 0.2; // Simulate success/failure

      if (success) { // Check if response was successful
        setStatus('success');
        setStatusMessage('Message sent successfully! We will get back to you soon.');
        setFormData({ name: '', email: '', message: '' }); // Clear form
        formRef.current?.reset(); // Reset native form state
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Form submission error:', error);
      setStatus('error');
      setStatusMessage('Failed to send message. Please try again later.');
    }
  };

  return (
    <main className="container mx-auto px-4 py-16 sm:py-24 flex flex-col items-center">
      <div className="w-16 h-16 mb-8"> {/* Logo */}
        <Logo3D />
      </div>
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">Contact Us</h1>
      <form ref={formRef} onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-muted-foreground mb-1">Name</label>
          <Input
            ref={nameInputRef}
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your Name"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-muted-foreground mb-1">Email</label>
          <Input
            ref={emailInputRef}
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="your.email@example.com"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-muted-foreground mb-1">Message</label>
          <Textarea
            ref={messageTextareaRef}
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Your message..."
          />
        </div>
        <Button type="submit" disabled={status === 'submitting'} className="w-full">
          {status === 'submitting' ? 'Sending...' : 'Send Message'}
        </Button>

        {/* Status Messages */}
        {status === 'success' && (
          <p className="text-center text-green-600 mt-4">{statusMessage}</p>
        )}
        {status === 'error' && (
          <p className="text-center text-red-600 mt-4">{statusMessage}</p>
        )}
      </form>
    </main>
  );
}
