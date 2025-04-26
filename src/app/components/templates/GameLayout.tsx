import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Typography from '../atoms/Typography';
import AnimatedButton from '../molecules/AnimatedButton';
import GameProgressTracker from '../organisms/GameProgressTracker';
import ConfettiEffect from '../organisms/ConfettiEffect';
import CuteDecorationWrapper from '../organisms/CuteDecorationWrapper';
import FeedbackPopup from '../molecules/FeedbackPopup';
import Icon from '../atoms/Icon';

// Types for the game layout
interface GameLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  currentQuestion: number;
  totalQuestions: number;
  score: number;
  maxScore?: number;
  showConfetti?: boolean;
  showFeedback?: 'success' | 'error' | 'warning' | 'info' | null;
  feedbackMessage?: string;
  onFeedbackComplete?: () => void;
  showBackButton?: boolean;
  back