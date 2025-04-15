'use client'; // Required for form handling, hooks, and GSAP

import React, { useState, useRef, useEffect } from 'react';
import { gsap } from 'gsap';

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


export default function FeedbackPage() {
  const [formData, setFormData] = useState({ name: '', feedback: '' });
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [statusMessage, setStatusMessage] = useState('');

  const formRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const feedbackTextareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const inputs = [nameInputRef.current, feedbackTextareaRef.current];
    inputs.forEach(input => {
      if (!input) return;
      const tl = gsap.timeline({ paused: true });
      tl.to(input, { scale: 1.02, borderColor: '#3b82f6', duration: 0.3, ease: 'power2.out' });

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

    const endpoint = process.env.NEXT_PUBLIC_FEEDBACK_FORM_ENDPOINT;
    if (!endpoint) {
        console.error("Feedback form endpoint URL is not defined in .env");
        setStatus('error');
        setStatusMessage('Configuration error. Please contact support.');
        return;
    }

    try {
      console.log('Submitting Feedback to:', endpoint);
      console.log('Data:', formData);

      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      const success = Math.random() > 0.2; // Simulate success/failure

      if (success) { // Check if response was successful
        setStatus('success');
        setStatusMessage('Thank you for your feedback!');
        setFormData({ name: '', feedback: '' }); // Clear form
        formRef.current?.reset(); // Reset native form state
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Feedback submission error:', error);
      setStatus('error');
      setStatusMessage('Failed to submit feedback. Please try again later.');
    }
  };

  return (
    <main className="container mx-auto px-4 py-16 sm:py-24 flex flex-col items-center">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-8">Submit Feedback</h1>
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
          <label htmlFor="feedback" className="block text-sm font-medium text-muted-foreground mb-1">Feedback</label>
          <Textarea
            ref={feedbackTextareaRef}
            id="feedback"
            name="feedback"
            rows={5}
            value={formData.feedback}
            onChange={handleChange}
            required
            placeholder="Your feedback..."
          />
        </div>
        <Button type="submit" disabled={status === 'submitting'} className="w-full">
          {status === 'submitting' ? 'Submitting...' : 'Submit Feedback'}
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
