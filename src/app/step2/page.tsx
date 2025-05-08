"use client";

import React, { useEffect } from "react";
import { LearningStepLayout } from "../components";
import { usePageLoader } from "../context/PageLoaderContext";

const Step2Page = () => {
  const { stopLoading } = usePageLoader();
  const contentSlides = [
    "A fraction on a number line shows how a whole is divided into equal parts.",
    "Placing fractions on a number line, we can see their size and compare them easily.",
    "Using a number line makes it easy to compare fractions. The further a fraction is to the right, the larger its value.",
    "Use the concept of denominator and numerator when making the fraction on the number line.",
    "You can find a fraction on the number line by dividing the space between 0 and 1 into equal parts based on the denominator. For example, to show 1/4, divide the segment into 4 equal parts."
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
