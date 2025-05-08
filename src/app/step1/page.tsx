"use client";

import React, { useEffect } from "react";
import { LearningStepLayout } from "../components";
import { usePageLoader } from "../context/PageLoaderContext";

const Step1Page = () => {
  const { stopLoading } = usePageLoader();
  const contentSlides = [
    "denominator : The bottom number of a fraction, showing how many equal parts the whole is divided into",
    "numerator : the top number of a fraction, showing how many parts you have or are being considered",
    "Dividing line : also known as the division or dividing bar, fraction line or bar, the line in a fraction separating the numerator from the denominator",
    "A fraction is a part of a whole.",
    "A fraction shows how something is divided into equal parts, with each part being the same size"
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
