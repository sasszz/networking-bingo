"use client";

import { useEffect, useState } from "react";
import { MiniBingoCard } from "../MiniBingoCard";
import { calculateProgress } from "./calculate-progress";
import { sortPlayers } from "./sort-players";
import { Game } from "./game-data";

interface LeaderboardProps {
  gameData: Game;
}

export const Leaderboard = ({ gameData }: LeaderboardProps) => {
  const [game, setGame] = useState<Game | null>(null);

  useEffect(() => {
    setGame(gameData);
  }, [gameData]);

  if (!game) return <div>Loading game data...</div>;

  const playersWithProgress = game.players.map((player) => {
    const { tilesNeeded, completedAt } = calculateProgress(
      player,
      game.winningType
    );
    return { ...player, tilesNeeded, completedAt };
  });

  const sortedPlayers = sortPlayers(playersWithProgress);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <h2>{game.gameName}</h2>
      <p>Started at: {new Date(game.startTime).toLocaleString()}</p>
      <p>Ends at: {new Date(game.endTime).toLocaleString()}</p>
      <p>Players: {game.numberOfPlayers}</p>
      <p>Winning Condition: {game.winningType}</p>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {sortedPlayers.map((player) => (
          <div
            key={player.name}
            className="flex flex-col items-center gap-2 p-4 border rounded-lg shadow"
          >
            <span className="font-semibold">
              {player.name}{" "}
              {player.completedAt
                ? `(Completed at ${new Date(
                    player.completedAt
                  ).toLocaleTimeString()})`
                : `(Tiles needed: ${player.tilesNeeded})`}
            </span>
            <MiniBingoCard
              type={game.winningType}
              filledCoordinates={player.filledCoordinates.map(
                ({ coord }) => coord
              )}
            />
          </div>
        ))}
      </div>
    </div>
  );
};
