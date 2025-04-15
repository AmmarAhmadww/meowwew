'use client'; // Required for GSAP animations

import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { Code, Database, GitBranch, Cloud, Terminal, Container, Cog } from 'lucide-react'; // Using Cog for React, Code for Node, Container for Docker

const skills = [
  { name: 'React / Next.js', Icon: Cog }, // Using Cog as a placeholder for React
  { name: 'Node.js', Icon: Code },
  { name: 'Express.js', Icon: Terminal },
  { name: 'MongoDB / PostgreSQL', Icon: Database },
  { name: 'Git', Icon: GitBranch },
  { name: 'Docker', Icon: Container }, // Changed Docker to Container
  { name: 'AWS', Icon: Cloud },
];

export default function SkillsPage() {
  const skillRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    skillRefs.current.forEach((el) => {
      if (!el) return;

      const icon = el.querySelector('svg');
      // const text = el.querySelector('span'); // Removed unused variable


      const tl = gsap.timeline({ paused: true });
      tl.to(icon, { scale: 1.2, color: '#3b82f6', duration: 0.3, ease: 'power2.out' }) // Example color: blue-500
        .to(icon, { y: -5, duration: 0.2, ease: 'power1.inOut' }, '-=0.2') // Bounce effect
        .to(icon, { y: 0, duration: 0.3, ease: 'bounce.out' });

      el.addEventListener('mouseenter', () => tl.play());
      el.addEventListener('mouseleave', () => tl.reverse());

      return () => {
        el.removeEventListener('mouseenter', () => tl.play());
        el.removeEventListener('mouseleave', () => tl.reverse());
        if (tl.isActive()) {
          tl.kill();
        }
      };
    });
  }, []);

  return (
    <main className="container mx-auto px-4 py-16 sm:py-24">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12">My Skills</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 justify-items-center">
        {skills.map((skill, index) => (
          <div
            key={skill.name}
            ref={(el) => { if (el) skillRefs.current[index] = el; }}
            className="flex flex-col items-center p-6 border rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300 w-full max-w-[150px] aspect-square justify-center" // Added aspect-square and justify-center
          >
            <skill.Icon size={48} className="mb-4 text-muted-foreground" />
            <span className="text-sm font-medium text-center">{skill.name}</span>
          </div>
        ))}
      </div>
    </main>
  );
}
