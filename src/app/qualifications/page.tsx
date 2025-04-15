'use client'; // Required for GSAP animations

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger'; // Import ScrollTrigger for scroll-based animations

gsap.registerPlugin(ScrollTrigger); // Register ScrollTrigger plugin

const qualifications = [
  { title: 'Matric', year: '2015', institution: 'City High School' },
  { title: 'ICS', year: '2017', institution: 'City Intermediate College' },
  { title: 'Bachelor’s in Computer Science', year: '2021', institution: 'ABC University' },
];

export default function QualificationsPage() {
  const qualificationRefs = useRef<HTMLDivElement[]>([]);
  const containerRef = useRef(null);

  useEffect(() => {
    qualificationRefs.current.forEach((el) => {
      if (!el) return;

      gsap.fromTo(
        el,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 80%', // Start animation when 80% of the element is visible
            toggleActions: 'play none none none', // Play animation once when triggered
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <main ref={containerRef} className="container mx-auto px-4 py-16 sm:py-24">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12">Qualifications</h1>
      <div className="space-y-8 max-w-2xl mx-auto">
        {qualifications.map((qual, index) => (
          <div
            key={qual.title}
            ref={(el) => { if (el) qualificationRefs.current[index] = el; }}
            className="p-6 border rounded-lg shadow-sm bg-card text-card-foreground" // Use card styles
          >
            <h2 className="text-xl font-semibold mb-1">{qual.title}</h2>
            <p className="text-sm text-muted-foreground mb-2">{qual.institution}</p>
            <p className="text-sm font-medium">{qual.year}</p>
          </div>
        ))}
      </div>
    </main>
  );
}
