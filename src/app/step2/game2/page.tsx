"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { 
  GameLayout, 
  MultipleQuestion, 
  AnimatedButton,
  Icon 
} from "../../components";

const Game2 = () => {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showFeedback, setShowFeedback] = useState<"success" | "error" | "warning" | "info" | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);

  // Game questions about equivalent fractions
  const questions = [
    {
      question: "Which fraction is equivalent to 1/2?",
      options: ["1/4", "2/4", "3/6", "5/10"],
      correctAnswer: "2/4",
      explanation: "1/2 = 2/4 because if we multiply both top and bottom by 2, we get the same value."
    },
    {
      question: "Select the equivalent fraction for 3/6",
      options: ["1/3", "1/2", "6/12", "5/10"],
      correctAnswer: "1/2",
      explanation: "3/6 = 1/2 because we can simplify by dividing both the numerator and denominator by 3."
    },
    {
      question: "Which of these fractions is equivalent to 4/12?",
      options: ["1/3", "2/3", "1/4", "2/6"],
      correctAnswer: "1/3",
      explanation: "4/12 = 1/3 because we can simplify by dividing both the numerator and denominator by 4."
    },
    {
      question: "Which fraction is NOT equivalent to 2/5?",
      options: ["4/10", "8/20", "6/15", "3/6"],
      correctAnswer: "3/6",
      explanation: "3/6 = 1/2, which is not equivalent to 2/5. The others are all equivalent to 2/5."
    },
    {
      question: "To create an equivalent fraction, you can:",
      options: [
        "Add the same number to the numerator and denominator",
        "Multiply the numerator and denominator by the same number",
        "Subtract the same number from both numerator and denominator",
        "Divide the numerator by the denominator"
      ],
      correctAnswer: "Multiply the numerator and denominator by the same number",
      explanation: "Multiplying both the numerator and denominator by the same non-zero number creates an equivalent fraction."
    }
  ];

  const checkAnswer = (selectedOption: string) => {
    const currentQ = questions[currentQuestion];
    const isCorrect = selectedOption === currentQ.correctAnswer;
    
    if (isCorrect) {
      setScore(score + 1);
      setShowFeedback("success");
      setShowConfetti(true);
    } else {
      setShowFeedback("error");
    }
    
    // Move to next question after feedback
    setTimeout(() => {
      setShowFeedback(null);
      setShowConfetti(false);
      
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setGameComplete(true);
      }
    }, 2000);
  };

  if (gameComplete) {
    return (
      <GameLayout
        title="Equivalent Fractions Game"
        subtitle="Great job completing all the questions!"
        currentQuestion={questions.length}
        totalQuestions={questions.length}
        score={score}
        maxScore={questions.length}
        showConfetti={true}
        backgroundColor="bg-gradient-to-br from-pink-50 to-pink-100"
        accentColor="pink"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-white p-8 rounded-2xl shadow-lg text-center"
        >
          <h2 className="text-2xl font-bold text-pink-600 mb-4">Game Completed!</h2>
          <p className="text-lg mb-2">
            Your final score: <span className="font-bold text-pink-600">{score}/{questions.length}</span>
          </p>
          <p className="mb-6">
            {score === questions.length 
              ? "Perfect score! You're a fraction master!" 
              : `You got ${score} out of ${questions.length} questions correct.`}
          </p>
          
          <div className="flex justify-center gap-4 flex-wrap">
            <AnimatedButton
              onClick={() => {
                setCurrentQuestion(0);
                setScore(0);
                setGameComplete(false);
              }}
              color="green"
              hoverEffect="bounce"
              icon={<Icon type="play" />}
            >
              Play Again
            </AnimatedButton>
            
            <AnimatedButton
              onClick={() => router.push("/menu")}
              color="blue"
              hoverEffect="wobble"
              icon={<Icon type="home" />}
            >
              Return to Menu
            </AnimatedButton>
          </div>
        </motion.div>
      </GameLayout>
    );
  }

  return (
    <GameLayout
      title="Equivalent Fractions Game"
      subtitle="Match the equivalent fractions"
      currentQuestion={currentQuestion}
      totalQuestions={questions.length}
      score={score}
      maxScore={questions.length}
      showConfetti={showConfetti}
      showFeedback={showFeedback}
      feedbackMessage={showFeedback === "success" 
        ? "Correct! " + questions[currentQuestion].explanation 
        : showFeedback === "error" 
          ? "Not quite. " + questions[currentQuestion].explanation 
          : undefined}
      onFeedbackComplete={() => setShowFeedback(null)}
      backgroundColor="bg-gradient-to-br from-pink-50 to-pink-100"
      accentColor="pink"
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <MultipleQuestion
            question={questions[currentQuestion].question}
            options={questions[currentQuestion].options}
            correctAnswer={questions[currentQuestion].correctAnswer}
            onSelect={checkAnswer}
            questionColor="primary"
            colorVariation={true}
            containerClassName="max-w-2xl mx-auto"
          />
        </motion.div>
      </AnimatePresence>
    </GameLayout>
  );
};

export default Game2;