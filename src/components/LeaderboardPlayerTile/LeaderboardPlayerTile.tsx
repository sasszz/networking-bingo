import { motion } from "framer-motion";
import { useState } from "react";
import styles from "./LeaderboardPlayerTile.module.scss";
import { MiniBingoCard } from "../MiniBingoCard";
import { Game } from "../Leaderboard/game-data";
import { PlayerWithProgress } from "../Leaderboard/sort-players";

interface LeaderboardPlayerTileProps {
  player: PlayerWithProgress;
  game: Game;
}

export const LeaderboardPlayerTile: React.FC<LeaderboardPlayerTileProps> = ({
  player,
  game,
}) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const prompts = [
    "takes the bus to work",
    "commutes 30+ min",
    "walks or bikes to work",
    "cat person",
    "owns a dog",
    "drinking a beer",
    "drinking water",
    "wearing a tie",
    "wearing sneakers",
    "ubered",
    "recruiter",
    "works at a startup",
    "works remote",
    "prefers dark mode",
    "devops",
    "project manager",
    "cx rep",
    "ran a marathon",
    "bootcamp grad",
    "attended a hackathon",
    "gave a tech talk",
    "typescript dev",
    "web3 degen",
    "uses chatgpt",
  ];

  return (
    <div className="w-full" style={{ perspective: 1000 }}>
      <motion.div
        className={styles.motionDiv}
        style={{ transformStyle: "preserve-3d" }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.4 }}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        <div
          className={`${styles.tile} ${
            isFlipped ? "" : "shadow-[4px_4px_0px_black]"
          }`}
          style={{ backfaceVisibility: "hidden" }}
        >
          <p>{player.name}</p>
          <p>
            {player.completedAt
              ? `Bingo at ${new Date(player.completedAt).toLocaleTimeString()}`
              : `Tiles needed: ${player.tilesNeeded}`}
          </p>
          <MiniBingoCard
            type={game.winningType}
            filledCoordinates={player.filledCoordinates.map(
              ({ coord }) => coord
            )}
          />
        </div>
        <div
          className={`${styles.tile} shadow-[4px_4px_0px_black] p-2`}
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          <p>Prompts Answered:</p>
          <div className={styles.scrollableList}>
            <div className="space-y-1">
              {prompts
                .slice()
                .reverse()
                .map((prompt, index) => (
                  <p key={index} className="pb-2">
                    {prompt}
                  </p>
                ))}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
