"use client";

import { useEffect, useState } from "react";
import { MiniBingoCard } from "../MiniBingoCard";
import { calculateProgress } from "./calculate-progress";
import { sortPlayers } from "./sort-players";
import { Game } from "./game-data";
import { GameTime } from "../GameTime";
import styles from "./Leaderboard.module.scss";

interface LeaderboardProps {
  gameData: Game;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ gameData }) => {
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
    <div className={styles.main}>
      <h2>{game.gameName}</h2>
      <div className={styles.gameInfoBox}>
        <GameTime startTime={game.startTime} endTime={game.endTime} />
        <p>{game.numberOfPlayers} players</p>
        <p>Winning Condition: {game.winningType}</p>
      </div>
      <div className={styles.leaderboardGrid}>
        {sortedPlayers.map((player) => (
          <div key={player.name} className={styles.playerTile}>
            <p>{player.name}</p>
            <p>
              {player.completedAt
                ? `bingo at ${new Date(
                    player.completedAt
                  ).toLocaleTimeString()}`
                : `Tiles needed: ${player.tilesNeeded}`}
            </p>
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
