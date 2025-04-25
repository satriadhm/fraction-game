import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SwipeableContentProps {
  contents: string[];
}

export const SwipeableContent: React.FC<SwipeableContentProps> = ({ contents }) => {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextContent = () => {
    setDirection(1);
    setIndex((prev) => (prev + 1) % contents.length);
  };

  const prevContent = () => {
    setDirection(-1);
    setIndex((prev) => (prev - 1 + contents.length) % contents.length);
  };

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  return (
    <div className="relative w-full max-w-2xl h-64 overflow-hidden bg-yellow-100 p-4 rounded-lg shadow-lg">
      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence initial={false} custom={direction} mode="wait">
          <motion.div
            key={index}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { type: "spring", stiffness: 300, damping: 30 },
              opacity: { duration: 0.2 },
            }}
            className="absolute w-full h-full flex items-center justify-center text-xl font-bold p-6 text-center"
          >
            {contents[index]}
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="absolute inset-y-0 left-0 flex items-center">
        <motion.button
          onClick={prevContent}
          className="bg-pink-500 hover:bg-pink-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg focus:outline-none mx-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          &#8249;
        </motion.button>
      </div>

      <div className="absolute inset-y-0 right-0 flex items-center">
        <motion.button
          onClick={nextContent}
          className="bg-pink-500 hover:bg-pink-600 text-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg focus:outline-none mx-2"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          &#8250;
        </motion.button>
      </div>

      <div className="absolute bottom-2 left-0 right-0 flex justify-center space-x-2">
        {contents.map((_, i) => (
          <motion.div
            key={i}
            className={`w-2 h-2 rounded-full ${
              i === index ? "bg-pink-600" : "bg-gray-300"
            }`}
            whileHover={{ scale: 1.2 }}
            onClick={() => {
              setDirection(i > index ? 1 : -1);
              setIndex(i);
            }}
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>
    </div>
  );
};
