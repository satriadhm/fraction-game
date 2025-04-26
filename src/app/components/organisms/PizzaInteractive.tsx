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
  const renderPizzaSlices = () => {
    const slices = [];
    const centerX = pizzaRadius;
    const centerY = pizzaRadius;

    for (let i = 0; i < totalSlices; i++) {
      const startAngle = (i * 360) / totalSlices;
      const endAngle = ((i + 1) * 360) / totalSlices;

      const startRad = (startAngle * Math.PI) / 180;
      const endRad = (endAngle * Math.PI) / 180;

      const x1 = centerX + pizzaRadius * Math.cos(startRad);
      const y1 = centerY + pizzaRadius * Math.sin(startRad);
      const x2 = centerX + pizzaRadius * Math.cos(endRad);
      const y2 = centerY + pizzaRadius * Math.sin(endRad);

      const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

      const pathData = `M ${centerX} ${centerY} L ${x1} ${y1} A ${pizzaRadius} ${pizzaRadius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;

      slices.push(
        <motion.path
          key={i}
          d={pathData}
          fill={selectedSlices.includes(i) ? pizzaColors.selected : pizzaColors.base}
          stroke={pizzaColors.crust}
          strokeWidth="2"
          onClick={() => togglePizzaSlice(i)}
          className="pizza-slice cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        />
      );
    }

    return slices;
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      {/* Pizza visualization */}
      <svg
        width={pizzaRadius * 2}
        height={pizzaRadius * 2}
        viewBox={`0 0 ${pizzaRadius * 2} ${pizzaRadius * 2}`}
        className="mb-4"
      >
        {/* Pizza base/crust circle */}
        <circle
          cx={pizzaRadius}
          cy={pizzaRadius}
          r={pizzaRadius}
          fill={pizzaColors.crust}
          opacity="0.2"
        />
        
        {/* Pizza slices */}
        {renderPizzaSlices()}
      </svg>

      {/* Fraction display */}
      {showFraction && (
        <div className="text-center mb-3">
          <Typography variant="subtitle1" color="primary" className="font-bold text-2xl">
            {selectedSlices.length}/{totalSlices}
          </Typography>
          <Typography variant="body2" color="secondary">
            {selectedSlices.length} out of {totalSlices} slices selected
          </Typography>
        </div>
      )}

      {/* Controls */}
      <div className="flex gap-2 mt-2">
        {mode === 'quiz' && targetSlices !== undefined && (
          <AnimatedButton
            onClick={checkAnswer}
            color="green"
            size="medium"
            hoverEffect="bounce"
            icon={<Icon type="check" />}
            disabled={disabled}
          >
            Check Answer
          </AnimatedButton>
        )}
        
        <AnimatedButton
          onClick={resetSelection}
          color="blue"
          size="small"
          hoverEffect="wobble"
          disabled={disabled || selectedSlices.length === 0}
        >
          Reset
        </AnimatedButton>
      </div>
    </div>
  );
};

export default PizzaInteractive;