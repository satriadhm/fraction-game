"use client";

import React, { useEffect } from "react";
import { LearningStepLayout } from "../components";
import { usePageLoader } from "../context/PageLoaderContext";

const Step2Page = () => {
  const { stopLoading } = usePageLoader();
  const contentSlides = [
    "Equivalent fractions are different fractions that represent the same value.",
    "By comparing the lengths of different rows, we can see which fractions are equivalent.",
    "For example, 1/2, 2/4, and 4/8 all represent the same portion of a whole, even though the numbers look different.",
    "Equivalent fractions are different fractions that represent the same amount of a whole.",
    "A fraction wall is a visual tool that helps us see how different fractions can be equal."
  ];
  
  useEffect(() => {
    stopLoading();
  }, [stopLoading]);

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
