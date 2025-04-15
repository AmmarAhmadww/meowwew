'use client'; // Required for R3F and GSAP

import React, { useRef, Suspense } from 'react';
import * as THREE from 'three'; // Import THREE namespace
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Box, Sphere, Cone } from '@react-three/drei';
import Link from 'next/link';

const ProjectPreview3D = ({ shape = 'box' }: { shape?: 'box' | 'sphere' | 'cone' }) => {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.3;
    }
  });

  const geometryArgs: [number?, number?, number?] = [1.5, 1.5, 1.5]; // Default size

  return (
    <mesh ref={meshRef}>
      {shape === 'box' && <Box args={geometryArgs}><meshStandardMaterial color="lightblue" /></Box>}
      {shape === 'sphere' && <Sphere args={[1, 32, 32]}><meshStandardMaterial color="lightcoral" /></Sphere>}
      {shape === 'cone' && <Cone args={[1, 2, 32]}><meshStandardMaterial color="lightgreen" /></Cone>}
    </mesh>
  );
};

const projects = [
  { id: 1, name: 'Project Alpha', description: 'A cool web application using React and Node.', liveUrl: '#', githubUrl: '#', previewShape: 'box' as const },
  { id: 2, name: 'Project Beta', description: 'An innovative mobile app built with Flutter.', liveUrl: '#', githubUrl: '#', previewShape: 'sphere' as const },
  { id: 3, name: 'Project Gamma', description: 'Data visualization dashboard with D3.js.', liveUrl: '#', githubUrl: '#', previewShape: 'cone' as const },
];

export default function ProjectsPage() {
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);


  return (
    <main className="container mx-auto px-4 py-16 sm:py-24">
      <h1 className="text-3xl sm:text-4xl font-bold text-center mb-12">My Projects</h1>

      {/* 3D Previews Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 h-64">
        {projects.map((project) => (
          <div key={`preview-${project.id}`} className="border rounded-lg overflow-hidden shadow-sm">
            <Canvas>
              <ambientLight intensity={0.6} />
              <pointLight position={[10, 10, 10]} intensity={1} />
              <Suspense fallback={null}> {/* Add Suspense for loading */}
                <ProjectPreview3D shape={project.previewShape} />
              </Suspense>
              <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={2}/>
            </Canvas>
          </div>
        ))}
      </div>

      {/* Project Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
          <div
            key={project.id}
            ref={(el) => { if (el) cardRefs.current[index] = el; }}
            className="border rounded-lg shadow-sm overflow-hidden bg-card text-card-foreground flex flex-col" // Added flex flex-col
          >
            {/* Optional: Add a static image placeholder if 3D preview is separate */}
            {/* <img src="/placeholder.jpg" alt={project.name} className="w-full h-48 object-cover"/> */}
            <div className="p-6 flex flex-col flex-grow"> {/* Added flex-grow */}
              <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
              <p className="text-muted-foreground mb-4 flex-grow">{project.description}</p> {/* Added flex-grow */}
              <div className="flex gap-4 mt-auto"> {/* Added mt-auto to push buttons down */}
                <Link href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2">
                  View Live
                </Link>
                <Link href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2">
                  GitHub
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
