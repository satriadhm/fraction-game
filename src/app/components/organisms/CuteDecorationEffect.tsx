import React, { useMemo } from 'react';
import FloatingItem from '../molecules/FloatingItem';
import CuteShapes, { CuteHeart, CuteStar, CuteStrawberry, CuteIceCream, CuteCookie } from '../atoms/CuteShapes';

interface CuteDecorationWrapperProps {
  children: React.ReactNode;
  numItems?: number;
  className?: string;
  theme?: 'random' | 'hearts' | 'stars' | 'food' | 'mixed';
  density?: 'sparse' | 'medium' | 'dense';
  interactive?: boolean;
  animationSpeed?: 'slow' | 'medium' | 'fast';
  size?: 'small' | 'medium' | 'large';
}

/**
 * A wrapper component that adds cute floating decorative elements around content
 */
const CuteDecorationWrapper: React.FC<CuteDecorationWrapperProps> = ({
  children,
  numItems = 5,
  className = '',
  theme = 'random',
  density = 'medium',
  interactive = true,
  animationSpeed = 'medium',
  size = 'medium'
}) => {
  // Size mappings
  const sizeMap = {
    small: { min: 10, max: 16 },
    medium: { min: 16, max: 30 },
    large: { min: 24, max: 40 }
  };
  
  // Animation speed (duration in seconds)
  const speedMap = {
    slow: { min: 4, max: 7 },
    medium: { min: 2, max: 5 },
    fast: { min: 1, max: 3 }
  };
  
  // Generate decoration items based on props
  const decorations = useMemo(() => {
    // Determine number of items based on density
    let itemCount = numItems;
    if (density === 'sparse') itemCount = Math.max(3, Math.floor(numItems * 0.6));
    if (density === 'dense') itemCount = Math.floor(numItems * 1.5);
    
    // Choose which shape components to use based on theme
    let shapeOptions: React.FC<any>[] = [];
    switch (theme) {
      case 'hearts':
        shapeOptions = [CuteHeart];
        break;
      case 'stars':
        shapeOptions = [CuteStar];
        break;
      case 'food':
        shapeOptions = [CuteStrawberry, CuteIceCream, CuteCookie];
        break;
      case 'mixed':
        shapeOptions = [CuteHeart, CuteStar, CuteIceCream];
        break;
      case 'random':
      default:
        shapeOptions = [CuteHeart, CuteStar, CuteStrawberry, CuteIceCream, CuteCookie];
        break;
    }
    
    // Generate random items
    return Array.from({ length: itemCount }).map((_, i) => {
      // Random position, making sure it's not too close to edges
      const x = `${Math.random() * 90 + 5}%`;
      const y = `${Math.random() * 90 + 5}%`;
      
      // Random size within the configured range
      const itemSize = Math.floor(
        Math.random() * (sizeMap[size].max - sizeMap[size].min) + sizeMap[size].min
      );
      
      // Random animation duration within the configured range
      const duration = 
        Math.random() * (speedMap[animationSpeed].max - speedMap[animationSpeed].min) + 
        speedMap[animationSpeed].min;
      
      // Random delay for staggered animations
      const delay = Math.random() * 2;
      
      // Random shape from our options
      const DecorativeShape = shapeOptions[Math.floor(Math.random() * shapeOptions.length)];
      
      // Random color for hearts and stars
      let shapeColor;
      if (DecorativeShape === CuteHeart) {
        shapeColor = ['#EC4899', '#DB2777', '#BE185D'][Math.floor(Math.random() * 3)];
      } else if (DecorativeShape === CuteStar) {
        shapeColor = ['#FCD34D', '#FBBF24', '#F59E0B'][Math.floor(Math.random() * 3)];
      }
      
      return {
        id: i,
        x,
        y,
        size: itemSize,
        duration,
        delay,
        Shape: DecorativeShape,
        color: shapeColor
      };
    });
  }, [numItems, theme, density, size, animationSpeed]);

  return (
    <div className={`relative ${className}`}>
      {children}
      
      {/* Render floating decorative items */}
      {decorations.map(item => (
        <FloatingItem
          key={item.id}
          x={item.x}
          y={item.y}
          size={item.size}
          delay={item.delay}
          duration={item.duration}
          interactive={interactive}
          amplitude={item.size / 2}
        >
          <item.Shape size={item.size} color={item.color} />
        </FloatingItem>
      ))}
    </div>
  );
};

export default CuteDecorationWrapper;