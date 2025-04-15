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
    <div style={{ width: '50px', height: '50px' }}> {/* Adjust size as needed */}
      <Canvas>
        <ambientLight intensity={Math.PI / 2} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} decay={0} intensity={Math.PI} />
        <pointLight position={[-10, -10, -10]} decay={0} intensity={Math.PI} />
        <SpinningBox />
      </Canvas>
    </div>
  );
};

export default Logo3D;
