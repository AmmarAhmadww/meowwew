'use client'; // Required for React Three Fiber components

import React, { useRef } from 'react';
import * as THREE from 'three'; // Import THREE namespace
import { Canvas, useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei'; // Removed OrbitControls import

const SpinningBox = () => {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.5;
      meshRef.current.rotation.y += delta * 0.5;
    }
  });

  return (
    <Box ref={meshRef} args={[1, 1, 1]}>
      <meshStandardMaterial color="orange" />
    </Box>
  );
};

const Logo3D = () => {
  return (
    <Canvas camera={{ position: [0, 0, 2.5], fov: 75 }}> {/* Add default camera */}
      <ambientLight intensity={1.5} /> {/* Simplified lighting */}
      <directionalLight position={[5, 5, 5]} intensity={1} /> {/* Added directional light */}
      <SpinningBox />
    </Canvas>
  );
};

export default Logo3D;
