"use client";

import React from "react";
import ProgressBar from "../molecules/ProgressBar";

interface CandyProgressBarProps {
  progress: number;
  total: number;
  color?: "pink" | "blue" | "green" | "purple" | "orange" | "yellow";
}

const CandyProgressBar: React.FC<CandyProgressBarProps> = ({
  progress,
  total,
  color = "pink",
}) => {
  return (
    <ProgressBar
      value={progress}
      max={total}
      variant="candy"
      color={color}
      height={10}
    />
  );
};

export default CandyProgressBar;