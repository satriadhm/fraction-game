"use client";

import { useState } from 'react';

const Game1 = () => {
  const [correct, setCorrect] = useState(false);

  const checkAnswer = (filled: number) => {
    if (filled === 3) {
      setCorrect(true);
      new Audio('/correct.mp3').play();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-100 p-8">
      <h1 className="text-3xl font-bold mb-4">Game: Mewarnai Pecahan</h1>
      <p className="mb-4">Warnai 3 dari 4 bagian</p>
      <div className="grid grid-cols-2 gap-2">
        {[0, 1, 2, 3].map((index) => (
          <button key={index} className="w-16 h-16 bg-gray-300 border" onClick={() => checkAnswer(index + 1)}></button>
        ))}
      </div>
      {correct && <p className="mt-4 text-green-600">Benar! 🎉</p>}
    </div>
  );
};

export default Game1;
