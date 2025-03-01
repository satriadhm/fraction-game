import { motion } from 'framer-motion';

interface AnimatedButtonProps {
  children: React.ReactNode;
  onClick: () => void;
}

const AnimatedButton = ({ children, onClick }: AnimatedButtonProps) => {
  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={onClick}
      className="bg-orange-600 text-white px-8 py-4 rounded-full text-2xl font-bold shadow-lg hover:bg-orange-700 transition-colors"
    >
      {children}
    </motion.button>
  );
};

export default AnimatedButton;