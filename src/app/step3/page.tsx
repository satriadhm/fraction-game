"use client";

import React, { useEffect } from "react";
import { LearningStepLayout } from "../components";
import { usePageLoader } from "../context/PageLoaderContext";

const Step3Page = () => {
  const { stopLoading } = usePageLoader();
  const contentSlides = [
    "Fractions can be represented on a number line, showing their relative position between whole numbers.",
    "A number line helps visualize the size and relationship between different fractions.",
    "To place a fraction on a number line, divide the space between whole numbers into equal parts.",
    "Mixed numbers (like 1½) are placed between the whole numbers they fall between.",
    "The number line helps us compare fractions and understand their values better.",
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
