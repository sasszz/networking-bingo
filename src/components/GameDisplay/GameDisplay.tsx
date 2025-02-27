"use client";

import { generateGameCode, useGame } from "@/lib/contexts/GameContext";
import { BingoCard as BingoCardComponent } from "@/components";
import { useEffect } from "react";

export const GameDisplay = () => {
  const { gameData, bingoCardData, setGameData } = useGame();

  useEffect(() => {
    if (!gameData.gameCode) {
      console.warn("gameCode is missing. Generating a new one...");
      setGameData((prev) => ({
        ...prev,
        gameCode: generateGameCode(),
      }));
    }
  }, [gameData.gameCode, setGameData]);

  if (!gameData.gameCode) {
    return <p>Generating game code...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center gap-12 text-center pb-24">
      <h2>{gameData.gameName}</h2>

      {bingoCardData.prompts && bingoCardData.prompts.length > 0 ? (
        <BingoCardComponent
          items={bingoCardData.prompts}
          gameCode={gameData.gameCode}
        />
      ) : (
        <p>Loading Bingo Card...</p>
      )}

      {gameData.gameName ? (
        <div className="flex flex-col gap-4">
          <p>game info</p>
          <table className="table-auto border-collapse border border-gray-300 w-full">
            <tbody>
              {[
                ["Game Code", gameData.gameCode || "Not generated yet"],
                ["Winning Type", gameData.winningType],
                ["Game Status", gameData.status || "Not started"],
                gameData.duration
                  ? [
                      "Duration",
                      gameData.duration >= 60
                        ? `${Math.floor(gameData.duration / 60)} hours ${
                            gameData.duration % 60
                              ? `${gameData.duration % 60} minutes`
                              : ""
                          }`
                        : `${gameData.duration} minutes`,
                    ]
                  : null,
                ["Start Time", gameData.startTime?.toLocaleString()],
                [
                  "End Time",
                  gameData.endTime
                    ? new Date(gameData.endTime).toLocaleString()
                    : "Not set",
                ],
              ]
                .filter((row): row is [string, string] => Array.isArray(row))
                .map(([label, value], index) => (
                  <tr key={index}>
                    <td className="border border-gray-300 px-4 py-2 font-semibold">
                      {label}
                    </td>
                    <td className="border border-gray-300 px-4 py-2">
                      {value}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>Loading Game Details...</p>
      )}
    </div>
  );
};
