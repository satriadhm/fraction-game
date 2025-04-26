import React from 'react';
import { motion } from 'framer-motion';

export type ProgressBarVariant = 'standard' | 'gradient' | 'candy' | 'segments';
export type ProgressBarColor = 'pink' | 'blue' | 'green' | 'purple' | 'orange' | 'yellow';

interface ProgressBarProps {
  value: number;
  max: number;
  height?: number;
  variant?: ProgressBarVariant;
  color?: ProgressBarColor;
  className?: string;
  showPercentage?: boolean;
  animate?: boolean;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  height = 6,
  variant = 'standard',
  color = 'pink',
  className = '',
  showPercentage = false,
  animate = true
}) => {
  // Calculate percentage
  const percentage = Math.min(Math.max(0, (value / max) * 100), 100);
  
  // Colors for different variants
  const colorClasses = {
    standard: {
      pink: 'bg-pink-500',
      blue: 'bg-blue-500',
      green: 'bg-green-500',
      purple: 'bg-purple-500',
      orange: 'bg-orange-500',
      yellow: 'bg-yellow-500'
    },
    gradient: {
      pink: 'bg-gradient-to-r from-pink-400 to-pink-600',
      blue: 'bg-gradient-to-r from-blue-400 to-blue-600',
      green: 'bg-gradient-to-r from-green-400 to-green-600',
      purple: 'bg-gradient-to-r from-purple-400 to-purple-600',
      orange: 'bg-gradient-to-r from-orange-400 to-orange-600',
      yellow: 'bg-gradient-to-r from-yellow-400 to-yellow-600'
    }
  };

  // Base classes for the container
  const containerClasses = `w-full rounded-full overflow-hidden bg-gray-200 ${className}`;
  
  // Get the appropriate color class based on variant and color
  let colorClass = '';
  if (variant === 'standard' || variant === 'segments') {
    colorClass = colorClasses.standard[color];
  } else if (variant === 'gradient' || variant === 'candy') {
    colorClass = colorClasses.gradient[color];
  }

  // Render based on variant
  switch (variant) {
    case 'candy':
      return (
        <div className={containerClasses} style={{ height: `${height}px` }}>
          <motion.div
            className={`h-full ${colorClass} rounded-full`}
            initial={{ width: 0 }}
            animate={animate ? { width: `${percentage}%` } : undefined}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-white/30 to-transparent"></div>
          </motion.div>
          {showPercentage && (
            <div className="text-xs text-center mt-1">{Math.round(percentage)}%</div>
          )}
        </div>
      );
      
    case 'segments':
      return (
        <div className={containerClasses} style={{ height: `${height}px` }}>
          <div className="w-full h-full flex">
            {Array.from({ length: max }).map((_, index) => (
              <motion.div
                key={index}
                className={`h-full ${index < value ? colorClass : 'bg-gray-300'} first:rounded-l-full last:rounded-r-full mx-0.5`}
                style={{ width: `calc(${100 / max}% - 2px)` }}
                initial={{ opacity: 0.5, scale: 0.9 }}
                animate={animate && index < value ? { opacity: 1, scale: 1 } : undefined}
                transition={{ duration: 0.2, delay: index * 0.05 }}
              />
            ))}
          </div>
          {showPercentage && (
            <div className="text-xs text-center mt-1">{`${value}/${max} (${Math.round(percentage)}%)`}</div>
          )}
        </div>
      );
      
    default: // standard and gradient
      return (
        <div className={containerClasses} style={{ height: `${height}px` }}>
          <motion.div
            className={`h-full ${colorClass} rounded-full`}
            initial={{ width: 0 }}
            animate={animate ? { width: `${percentage}%` } : undefined}
            transition={{ duration: 0.5 }}
          />
          {showPercentage && (
            <div className="text-xs text-center mt-1">{Math.round(percentage)}%</div>
          )}
        </div>
      );
  }
};

export default ProgressBar;