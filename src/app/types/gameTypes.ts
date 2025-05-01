// src/app/step3/game3/types/gameTypes.ts

// Define an obstacle on the game area
export interface Obstacle {
  position: number; // Position on X-axis (percentage)
  width: number; // Width in percentage
  height: number; // Height in pixels
  color?: string; // Color of the obstacle
  moving?: boolean; // Whether the obstacle moves
  movementRange?: number; // How far it moves
  movementSpeed?: number; // How fast it moves
}

// Define a game level
export interface GameLevel {
  id: number;
  name: string;
  fraction: string; // Display text for the fraction
  numerator: number;
  denominator: number;
  hint?: string;
  challenge?: string; // Special challenge description
  background?: string; // CSS class for background
  lineGradient?: string; // CSS class for line gradient
  lineWidth?: number; // Width of the line in percentage
  moveSpeed?: number; // How fast the stickman moves
  accuracyThreshold?: number; // How close to correct position needed
  stealthMode?: boolean; // Whether to hide fraction marks
  timeBonusMultiplier: number; // Multiply time left for bonus points
  reversed?: boolean; // Whether the line direction is reversed
  obstacles?: Obstacle[]; // Array of obstacles
  hiddenSections?: number[]; // Array of section indices to hide
  animatedCharacter?: boolean; // Whether the character is animated
}
