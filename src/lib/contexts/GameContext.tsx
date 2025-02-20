"use client";

import { createContext, useContext, useState } from "react";
import { Game, BingoCard } from "@/lib/types/database";

export function generateGameCode(): string {
  return Array.from({ length: 6 }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26))
  ).join("");
}

interface GameContextType {
  step: number;
  setStep: (step: number) => void;
  gameData: Partial<Game>;
  setGameData: React.Dispatch<React.SetStateAction<Partial<Game>>>;
  bingoCardData: Partial<BingoCard>;
  setBingoCardData: React.Dispatch<React.SetStateAction<Partial<BingoCard>>>;
}

const getInitialTimes = () => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  tomorrow.setHours(10, 0, 0, 0);

  const endTime = new Date(tomorrow.getTime() + 180 * 60000);
  return { startTime: tomorrow, endTime };
};

const GameContext = createContext<GameContextType | undefined>(undefined);
export const GameProvider = ({ children }: { children: React.ReactNode }) => {
  const { startTime, endTime } = getInitialTimes();
  const [step, setStep] = useState(1);
  const [gameData, setGameData] = useState<Partial<Game>>({
    gameName: "",
    gameCode: generateGameCode(),
    status: "scheduled",
    startTime,
    endTime,
    duration: 180,
    winningType: "one-line",
  });

  const [bingoCardData, setBingoCardData] = useState<Partial<BingoCard>>({
    prompts: [],
  });

  return (
    <GameContext.Provider
      value={{
        step,
        setStep,
        gameData,
        setGameData,
        bingoCardData,
        setBingoCardData,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};


export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }
  return context;
};
