"use client";

import React from "react";
import { LearningStepLayout } from "../components";

const Step2Page = () => {
  const contentSlides = [
    "Equivalent fractions represent the same value, even though they may look different.",
    "To find equivalent fractions, multiply or divide both the numerator and denominator by the same number.",
    "For example, 1/2 = 2/4 = 3/6 = 4/8, they all represent the same value.",
    "Multiplication of fractions is done by multiplying the numerator and denominator.",
    "Division of fractions is done by multiplying by the reciprocal.",
  ];

  const videoSrc =
    process.env.NEXT_PUBLIC_YOUTUBE_STEP2 ||
    "https://www.youtube.com/embed/placeholder";

  return (
    <LearningStepLayout
      title="Step 2: Equivalent Fraction"
      stepNumber={2}
      stepName="Equivalent Fraction"
      iconSrc="/bakery.png"
      videoSrc={videoSrc}
      contentSlides={contentSlides}
      gamePath="/step2/game2"
      menuPath="/menu"
      backgroundColor="bg-gradient-to-b from-purple-50 to-pink-100"
      accentColor="purple"
      nextStepPath="/step3"
      prevStepPath="/step1"
      showNextPrevButtons={true}
    />
  );
};

export default Step2Page;
