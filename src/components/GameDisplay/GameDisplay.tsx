"use client";

import { useGame } from "@/lib/contexts/GameContext";
import { BingoCard as BingoCardComponent } from "@/components";

export const GameDisplay = () => {
  const { gameData, bingoCardData } = useGame();

  return (
    <div className="flex flex-col items-center justify-center gap-12 text-center pt-12">
      <h2>Networking Bingo</h2>

      {bingoCardData.prompts && bingoCardData.prompts.length > 0 ? (
        <BingoCardComponent items={bingoCardData.prompts} />
      ) : (
        <p>Loading Bingo Card...</p>
      )}

      {gameData.gameName ? (
        <>
          <p>Game Name: {gameData.gameName}</p>
          <p>Game Code: {gameData.gameCode || "Not generated yet"}</p>
          <p>Winning Type: {gameData.winningType}</p>
          <p>Game Status: {gameData.status || "Not started"}</p>
          <p>Start time: {gameData.startTime ? new Date(gameData.startTime).toLocaleString() : "Not set"}</p>
          <p>Duration: {gameData.duration} minutes</p>
          <p>End time: {gameData.endTime ? new Date(gameData.endTime).toLocaleString() : "Not set"}</p>
        </>
      ) : (
        <p>Loading Game Details...</p>
      )}
    </div>
  );
};
