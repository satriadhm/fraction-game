// src/app/components/index.ts
// This file exports all components to make imports cleaner

// Atoms
export { default as Button } from './atoms/Button';
export { default as Icon } from './atoms/Icon';
export { default as Typography } from './atoms/Typography';
export { default as MotionElement } from './atoms/MotionElement';
export { 
  CuteHeart,
  CuteStar,
  CuteStrawberry,
  CuteIceCream,
  CuteCookie,
  default as CuteShapes 
} from './atoms/CuteShapes';

// Molecules
export { default as AnimatedButton } from './molecules/AnimatedButton';
export { default as FeedbackPopup } from './molecules/FeedbackPopup';
export { default as FloatingItem } from './molecules/FloatingItem';
export { default as NavigationButton } from './molecules/NavigationButton';
export { default as ProgressBar } from './molecules/ProgressBar';

// Organisms
export { default as ConfettiEffect } from './organisms/ConfettiEffect';
export { default as CuteDecorationEffect } from './organisms/CuteDecorationEffect';
export { default as GameProgressTracker } from './organisms/GameProgressTracker';
export { default as MultipleQuestion } from './organisms/MultipleQuestion';
export { default as PizzaInteractive } from './organisms/PizzaInteractive';
export { default as SwipeableContent } from './organisms/SwipableContent';

// Templates
export { default as GameLayout } from './templates/GameLayout';
export { default as LearningStepLayout } from './templates/LearningStepLayout';