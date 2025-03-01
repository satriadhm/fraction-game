import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Mesh } from 'three'; // Import the Mesh type from three.js

const InteractiveFood = () => {
  // Specify the type of meshRef as Mesh
  const meshRef = useRef<Mesh>(null);

  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.01;
      meshRef.current.rotation.y += 0.01;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[2, 2, 2]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

export default InteractiveFood;