'use client'; // Required for GSAP animations and hooks

import React, { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic'; // Import dynamic for client-side only components
import { gsap } from 'gsap';

const Logo3D = dynamic(() => import('@/components/Logo3D'), { ssr: false });

export default function Home() {
  const containerRef = useRef(null);
  const logoRef = useRef(null);
  const nameRef = useRef(null);
  const taglineRef = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

    tl.fromTo(logoRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 })
      .fromTo(nameRef.current, { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.5') // Overlap animation slightly
      .fromTo(taglineRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4'); // Overlap animation slightly


  }, []);

  return (
    <div ref={containerRef} className="flex flex-col items-center justify-center min-h-[calc(100vh-theme(spacing.24)-theme(spacing.14))] text-center px-4">
      {/* Adjust min-h to account for header and footer height */}
      <div ref={logoRef} className="mb-8 w-40 h-40"> {/* Adjust size as needed */}
        <Logo3D />
      </div>
      <h1 ref={nameRef} className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
        Your Name Here
      </h1>
      <p ref={taglineRef} className="text-lg sm:text-xl md:text-2xl text-muted-foreground">
        Creative Fullstack Developer 🚀
      </p>
      {/* Placeholder for floating/parallax elements */}
      {/* <div className="floating-element absolute top-20 left-20 w-10 h-10 bg-blue-500 rounded-full opacity-50"></div> */}
      {/* <div className="floating-element absolute bottom-20 right-20 w-16 h-16 bg-purple-500 rounded-lg opacity-50"></div> */}
    </div>
  );
}
