"use client";

import React, { useEffect } from "react";
import { LearningStepLayout } from "../components";
import { usePageLoader } from "../context/PageLoaderContext";

const Step3Page = () => {
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
    process.env.NEXT_PUBLIC_YOUTUBE_STEP3 ||
    "https://www.youtube.com/embed/placeholder";

  return (
    <LearningStepLayout
      title="Step 3: Fraction in Number Line"
      stepNumber={3}
      stepName="Fraction in Number Line"
      iconSrc="/stationery.png"
      videoSrc={videoSrc}
      contentSlides={contentSlides}
      gamePath="/step3/game3"
      menuPath="/menu"
      backgroundColor="bg-gradient-to-b from-blue-50 to-blue-100"
      accentColor="blue"
      prevStepPath="/step2"
      showNextPrevButtons={true}
    />
  );
};

export default Step3Page;
