import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { motion } from "framer-motion";
import {  Group } from "three";

// Define types for props
interface PizzaSliceProps {
  position: [number, number, number];
  rotation: [number, number, number];
  index: number;
  totalSlices: number;
  selected: boolean;
  onClick: (index: number) => void;
}

// A single pizza slice in 3D
const PizzaSlice: React.FC<PizzaSliceProps> = ({
  position,
  rotation,
  index,
  totalSlices,
  selected,
  onClick,
}) => {
  // Calculate the angle for each slice
  const angle = (Math.PI * 2) / totalSlices;
  const sliceRef = useRef<Group>(null);

  // Animation effect
  useFrame((state) => {
    if (sliceRef.current) {
      if (selected) {
        // When selected, make it "jump" slightly
        sliceRef.current.position.y =
          position[1] + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      } else {
        // When not selected, return to original position
        sliceRef.current.position.y = position[1];
      }
    }
  });

  return (
    <group
      ref={sliceRef}
      position={position}
      rotation={rotation}
      onClick={(e) => {
        e.stopPropagation();
        onClick(index);
      }}
    >
      {/* Pizza base (crust) */}
      <mesh rotation={[0, 0, angle * index]}>
        <cylinderGeometry args={[1, 1, 0.1, 32, 1, false, 0, angle]} />
        <meshStandardMaterial color="#E2BF81" />
      </mesh>

      {/* Pizza topping (cheese and sauce) */}
      <mesh position={[0, 0.06, 0]} rotation={[0, 0, angle * index]}>
        <cylinderGeometry args={[0.9, 0.9, 0.1, 32, 1, false, 0, angle]} />
        <meshStandardMaterial color={selected ? "#FFA500" : "#FFCB8E"} />
      </mesh>

      {/* Additional toppings (pepperoni) if selected */}
      {selected && (
        <>
          <mesh
            position={[0.4, 0.12, 0]}
            rotation={[Math.PI / 2, 0, angle * index]}
          >
            <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
            <meshStandardMaterial color="#C62828" />
          </mesh>
          <mesh
            position={[0.6, 0.12, 0.2]}
            rotation={[Math.PI / 2, 0, angle * index]}
          >
            <cylinderGeometry args={[0.1, 0.1, 0.05, 16]} />
            <meshStandardMaterial color="#C62828" />
          </mesh>
        </>
      )}
    </group>
  );
};

// Define types for Pizza props
interface PizzaProps {
  slices: number;
  selectedSlices: number[];
  onSliceClick: (index: number) => void;
}

// The complete pizza
const Pizza: React.FC<PizzaProps> = ({
  slices = 4,
  selectedSlices = [],
  onSliceClick,
}) => {
  const groupRef = useRef<Group>(null);

  useFrame((state) => {
    if (groupRef.current) {
      // Slowly rotate the entire pizza
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Create all the pizza slices */}
      {Array.from({ length: slices }).map((_, index) => (
        <PizzaSlice
          key={index}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          index={index}
          totalSlices={slices}
          selected={selectedSlices.includes(index)}
          onClick={onSliceClick}
        />
      ))}
    </group>
  );
};

// Define types for PizzaScene props
interface PizzaSceneProps {
  slices: number;
  selectedSlices: number[];
  onSliceClick: (index: number) => void;
}

// Scene setup
const PizzaScene: React.FC<PizzaSceneProps> = ({
  slices,
  selectedSlices,
  onSliceClick,
}) => {
  return (
    <Canvas
      camera={{ position: [0, 2, 5], fov: 45 }}
      style={{ height: "300px" }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <Pizza
        slices={slices}
        selectedSlices={selectedSlices}
        onSliceClick={onSliceClick}
      />
    </Canvas>
  );
};

// Define types for InteractiveFood props
interface InteractiveFoodProps {
  slices?: number;
  onSelectionChange?: (selection: number[]) => void;
  maxSelections?: number | null;
}

// Main component that integrates the 3D pizza with a 2D interface
const InteractiveFood: React.FC<InteractiveFoodProps> = ({
  slices = 4,
  onSelectionChange = () => {},
  maxSelections = null,
}) => {
  const [selectedSlices, setSelectedSlices] = useState<number[]>([]);

  const handleSliceClick = (index: number) => {
    setSelectedSlices((prev) => {
      // If already selected, deselect
      if (prev.includes(index)) {
        const newSelection = prev.filter((i) => i !== index);
        onSelectionChange(newSelection);
        return newSelection;
      }
      // If not selected but we've reached max selections, do nothing
      else if (maxSelections !== null && prev.length >= maxSelections) {
        return prev;
      }
      // Otherwise, select
      else {
        const newSelection = [...prev, index];
        onSelectionChange(newSelection);
        return newSelection;
      }
    });
  };

  const resetSelection = () => {
    setSelectedSlices([]);
    onSelectionChange([]);
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="relative bg-gray-100 rounded-lg shadow-md overflow-hidden">
        <PizzaScene
          slices={slices}
          selectedSlices={selectedSlices}
          onSliceClick={handleSliceClick}
        />

        <div className="absolute bottom-4 right-4">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={resetSelection}
            className="bg-pink-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0114 0V5a1 1 0 112 0v2.101a9.005 9.005 0 00-2.092 12.09A1 1 0 0118 20H2a1 1 0 01-.707-1.707A9.005 9.005 0 003 7.101V3a1 1 0 011-1zm13 15a1 1 0 010-2 1 1 0 010 2z"
                clipRule="evenodd"
              />
            </svg>
          </motion.button>
        </div>
      </div>

      <div className="mt-4 text-center">
        <p className="text-lg font-semibold">
          {selectedSlices.length} out of {slices} slices selected
        </p>
        <p className="text-md text-gray-600">
          Fraction: {selectedSlices.length}/{slices}
        </p>
      </div>
    </div>
  );
};

export default InteractiveFood;
