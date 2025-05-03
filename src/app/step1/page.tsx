"use client";

import React, { useEffect } from "react";
import { LearningStepLayout } from "../components";
import { usePageLoader } from "../context/PageLoaderContext";

const Step1Page = () => {
  const { stopLoading } = usePageLoader();
  const contentSlides = [
    "Fractions represent parts of a whole. The denominator (bottom number) tells how many equal parts the whole is divided into.",
    "The numerator (top number) tells how many parts we're talking about.",
    "We can represent fractions using shapes divided into equal parts.",
    "When we shade parts of a shape, we can express the shaded portion as a fraction.",
    "Addition of fractions must have the same denominator.",
  ];

  useEffect(() => {
    stopLoading();
  }, [stopLoading]);

  const videoSrc =
    process.env.NEXT_PUBLIC_YOUTUBE_STEP1 ||
    "https://www.youtube.com/embed/placeholder";

  return (
    <LearningStepLayout
      title="Step 1: Fraction of Shape"
      stepNumber={1}
      stepName="Fraction of Shape"
      iconSrc="/pizza-store.png"
      videoSrc={videoSrc}
      contentSlides={contentSlides}
      gamePath="/step1/game1"
      menuPath="/menu"
      backgroundColor="bg-gradient-to-b from-green-50 to-green-100"
      accentColor="pink"
      nextStepPath="/step2"
      showNextPrevButtons={true}
    />
  );
};

export default Step1Page;
