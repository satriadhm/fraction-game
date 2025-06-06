// src/app/step3/game3/data/gameLevels.ts
import { GameLevel } from "../types/gameTypes";

// Define all game levels with increasing difficulty
export const GAME_LEVELS: GameLevel[] = [
  // Level 1: Basic introduction to 1/2
  {
    id: 1,
    name: "Basic Fraction",
    fraction: "1/2",
    numerator: 1,
    denominator: 2,
    hint: "Cut exactly in the middle of the line",
    moveSpeed: 1.5,
    accuracyThreshold: 5,
    timeBonusMultiplier: 1,
    background: "bg-gradient-to-r from-amber-50 to-blue-50",
    lineGradient: "bg-gradient-to-r from-red-500 to-blue-500",
    animatedCharacter: true,
  },

  // Level 2: Introduction to quarters
  {
    id: 2,
    name: "The Quarters",
    fraction: "3/4",
    numerator: 3,
    denominator: 4,
    hint: "Find the 3rd mark out of 4 equal sections",
    moveSpeed: 2,
    accuracyThreshold: 4,
    timeBonusMultiplier: 1.5,
    background: "bg-gradient-to-r from-blue-50 to-indigo-50",
    lineGradient: "bg-gradient-to-r from-yellow-500 to-indigo-500",
  },

  // Level 3: Introduction to thirds with an obstacle
  {
    id: 3,
    name: "Thirds Challenge",
    fraction: "2/3",
    numerator: 2,
    denominator: 3,
    hint: "Find the 2nd mark out of 3 equal sections",
    challenge: "Watch out for the obstacle!",
    moveSpeed: 2,
    accuracyThreshold: 4,
    timeBonusMultiplier: 2,
    background: "bg-gradient-to-r from-green-50 to-blue-50",
    obstacles: [
      {
        position: 50,
        width: 15,
        height: 30,
        color: "rgba(239, 68, 68, 0.5)",
        moving: false,
      },
    ],
  },

  // Level 4: More complex fraction with moving obstacle
  {
    id: 4,
    name: "Moving Target",
    fraction: "4/5",
    numerator: 4,
    denominator: 5,
    hint: "Find the 4th mark out of 5 equal sections",
    challenge: "The obstacle is moving! Time your cut.",
    moveSpeed: 2.5,
    accuracyThreshold: 3.5,
    timeBonusMultiplier: 2.5,
    background: "bg-gradient-to-r from-purple-50 to-pink-50",
    lineGradient: "bg-gradient-to-r from-purple-500 to-pink-500",
    obstacles: [
      {
        position: 25,
        width: 10,
        height: 40,
        color: "rgba(239, 68, 68, 0.6)",
        moving: true,
        movementRange: 50,
        movementSpeed: 3,
      },
    ],
  },

  // Level 5: Hidden sections challenge
  {
    id: 5,
    name: "Hidden Marks",
    fraction: "3/6",
    numerator: 3,
    denominator: 6,
    hint: "This is equivalent to 1/2 - find the middle!",
    challenge: "Some tick marks are hidden. Use your fraction knowledge!",
    moveSpeed: 3,
    accuracyThreshold: 3,
    timeBonusMultiplier: 3,
    background: "bg-gradient-to-r from-blue-100 to-purple-100",
    hiddenSections: [1, 2, 4, 5], // Only show 0, 3, and 6
    lineWidth: 95,
  },

  // Level 6: Stealth mode - no marks visible
  {
    id: 6,
    name: "Ninja Stealth",
    fraction: "1/4",
    numerator: 1,
    denominator: 4,
    hint: "Visualize the line divided into 4 equal parts",
    challenge: "Stealth mode activated - no tick marks visible!",
    moveSpeed: 2,
    accuracyThreshold: 4,
    timeBonusMultiplier: 3.5,
    background: "bg-gradient-to-r from-gray-800 to-gray-900",
    lineGradient: "bg-gradient-to-r from-red-600 to-blue-600",
    stealthMode: true,
  },

  // Level 7: Reversed line direction
  {
    id: 7,
    name: "Mirror World",
    fraction: "2/5",
    numerator: 2,
    denominator: 5,
    hint: "Watch out — the number line is flipped: 0 sits on the left!",
    challenge: "Fractions get larger as you move right along the line!",
    moveSpeed: 2.5,
    accuracyThreshold: 3.5,
    timeBonusMultiplier: 4,
    background: "bg-gradient-to-l from-amber-50 to-blue-100",
    lineGradient: "bg-gradient-to-l from-amber-500 to-blue-500",
    reversed: false,
  },

  // Level 8: Multiple moving obstacles
  {
    id: 8,
    name: "Obstacle Course",
    fraction: "5/8",
    numerator: 5,
    denominator: 8,
    hint: "Find the 5th mark out of 8 equal sections",
    challenge: "Navigate through multiple moving obstacles!",
    moveSpeed: 3,
    accuracyThreshold: 3,
    timeBonusMultiplier: 4.5,
    background: "bg-gradient-to-r from-orange-50 to-red-50",
    obstacles: [
      {
        position: 30,
        width: 8,
        height: 35,
        color: "rgba(220, 38, 38, 0.6)",
        moving: true,
        movementRange: 20,
        movementSpeed: 1.5,
      },
      {
        position: 70,
        width: 8,
        height: 35,
        color: "rgba(239, 68, 68, 0.6)",
        moving: true,
        movementRange: 20,
        movementSpeed: 2,
      },
    ],
  },

  // Level 9: Final challenge
  {
    id: 9,
    name: "Master Challenge",
    fraction: "7/12",
    numerator: 7,
    denominator: 12,
    hint: "Visualize the line divided into 12 equal parts",
    challenge: "The ultimate test of your fraction ninja skills!",
    moveSpeed: 4,
    accuracyThreshold: 2.5,
    timeBonusMultiplier: 5,
    background: "bg-gradient-to-r from-indigo-200 to-purple-200",
    lineGradient: "bg-gradient-to-r from-indigo-600 to-purple-600",
    stealthMode: true,
    obstacles: [
      {
        position: 20,
        width: 5,
        height: 30,
        color: "rgba(139, 92, 246, 0.7)",
        moving: true,
        movementRange: 15,
        movementSpeed: 1,
      },
      {
        position: 50,
        width: 5,
        height: 30,
        color: "rgba(139, 92, 246, 0.7)",
        moving: true,
        movementRange: 30,
        movementSpeed: 2,
      },
      {
        position: 80,
        width: 5,
        height: 30,
        color: "rgba(139, 92, 246, 0.7)",
        moving: true,
        movementRange: 15,
        movementSpeed: 1,
      },
    ],
  },

  // Level 10: Bonus ultra challenge
  {
    id: 10,
    name: "Fraction Grandmaster",
    fraction: "5/9",
    numerator: 5,
    denominator: 9,
    hint: "Use all your fraction knowledge for this ultimate test",
    challenge: "Reversed, stealth mode with multiple obstacles!",
    moveSpeed: 3,
    accuracyThreshold: 2,
    timeBonusMultiplier: 6,
    background: "bg-gradient-to-r from-purple-300 to-pink-300",
    lineGradient: "bg-gradient-to-r from-purple-700 to-pink-700",
    lineWidth: 90,
    stealthMode: true,
    reversed: true,
    obstacles: [
      {
        position: 30,
        width: 6,
        height: 45,
        color: "rgba(219, 39, 119, 0.6)",
        moving: true,
        movementRange: 40,
        movementSpeed: 3,
      },
      {
        position: 70,
        width: 6,
        height: 45,
        color: "rgba(219, 39, 119, 0.6)",
        moving: true,
        movementRange: 40,
        movementSpeed: 3.5,
      },
    ],
  },
];
