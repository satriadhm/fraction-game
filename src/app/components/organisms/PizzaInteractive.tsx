import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Typography from '../atoms/Typography';
import AnimatedButton from '../molecules/AnimatedButton';
import Icon from '../atoms/Icon';

// SVG-based pizza visualization
interface PizzaInteractiveProps {
  totalSlices: number;
  targetSlices?: number;
  onSelectionChange?: (selectedSlices: number[]) => void;
  onSubmit?: (isCorrect: boolean) => void;
  mode?: 'learning' | 'quiz';
  showFraction?: boolean;
  className?: string;
  pizzaRadius?: number;
  pizzaColors?: {
    base: string;
    selected: string;
    crust: string;
  };
  disabled?: boolean;
  maxSelections?: number | null;
}

const PizzaInteractive: React.FC<PizzaInteractiveProps> = ({
  totalSlices,
  targetSlices,
  onSelectionChange,
  onSubmit,
  mode = 'learning',
  showFraction = true,
  className = '',
  pizzaRadius = 120,
  pizzaColors = {
    base: '#F5DEB3',
    selected: '#FFA500',
    crust: '#8B4513'
  },
  disabled = false,
  maxSelections = null
}) => {
  const [selectedSlices, setSelectedSlices] = useState<number[]>([]);
  
  useEffect(() => {
    if (onSelectionChange) {
      onSelectionChange(selectedSlices);
    }
  }, [selectedSlices, onSelectionChange]);

  const togglePizzaSlice = (index: number) => {
    if (disabled) return;
    
    setSelectedSlices(prev => {
      // If already selected, deselect
      if (prev.includes(index)) {
        return prev.filter(sliceIndex => sliceIndex !== index);
      }
      
      // If max selections is reached, don't add more
      if (maxSelections !== null && prev.length >= maxSelections) {
        return prev;
      }
      
      // Otherwise, select this slice
      return [...prev, index];
    });
  };

  const checkAnswer = () => {
    if (onSubmit && targetSlices !== undefined) {
      onSubmit(selectedSlices.length === targetSlices);
    }
  };

  const resetSelection = () => {
    setSelectedSlices([]);
  };

  // Render the pizza slices
  const render