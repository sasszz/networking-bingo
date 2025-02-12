"use client";

import { useEffect, useState } from "react";
import { MiniMiniBingoCard } from "../MiniBingoCard";
import { calculateProgress } from "./calculate-progress";
import { sortPlayers } from "./sort-players";
import { Game } from "./game-data";
import { GameTime } from "../GameTime";
import styles from "./Leaderboard.module.scss";
import { Button } from "../Button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { PeopleLine } from "../PeopleLine/PeopleLine";
import { IconButton, SvgIcons } from "../IconButton";
import { scrollToTop } from "../utilities";
import { LeaderboardPlayerTile } from "../LeaderboardPlayerTile";

interface LeaderboardProps {
  gameData: Game;
}

export const Leaderboard: React.FC<LeaderboardProps> = ({ gameData }) => {
  const [game, setGame] = useState<Game | null>(null);
  const router = useRouter();

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
        <PeopleLine count={game.numberOfPlayers} />
        <div className="flex flex-col items-center gap-1">
          <p>Winning Condition: {game.winningType}</p>
          <MiniMiniBingoCard type={game.winningType} />
        </div>
        <Link
          href="#"
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
        >
          <Button buttonText="Go Back" />
        </Link>
      </div>
      <div className={styles.leaderboardGrid}>
        {sortedPlayers.map((player) => (
          <LeaderboardPlayerTile
            key={player.name}
            player={player}
            game={game}
          />
        ))}
      </div>
      <IconButton icon={SvgIcons.Up} onClick={() => scrollToTop()} />
    </div>
  );
};
