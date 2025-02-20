"use client";

import { useState } from "react";
import { useGame } from "@/lib/contexts/GameContext";
import styles from "./BingoGameCreationForm.module.scss";
import { MiniBingoCard } from "../MiniBingoCard";
import { Game } from "@/lib/types/database";

export const BingoGameCreationForm = ({ onNext }: { onNext: (gameDetails: Partial<Game>) => void }) => {
  const { gameData, setGameData } = useGame();
  console.log({ gameData });

  const [gameType, setGameType] = useState(gameData.winningType || "one-line");
  const [startTime, setStartTime] = useState<string>(
    gameData.startTime ? new Date(gameData.startTime).toISOString().slice(0, 16) : ""
  );
  const [endTime, setEndTime] = useState<string>(
    gameData.endTime ? new Date(gameData.endTime).toISOString().slice(0, 16) : ""
  );
  const [duration, setDuration] = useState<string>(String(gameData.duration || 180));
  const [gameName, setGameName] = useState(gameData.gameName || "");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const formatDateTimeLocal = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}T${String(date.getHours()).padStart(2, "0")}:${String(
      date.getMinutes()
    ).padStart(2, "0")}`;
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const minutes = parseInt(e.target.value, 10);
    setDuration(e.target.value);
    setGameData((prev) => ({ ...prev, duration: minutes }));
  
    if (startTime) {
      const startDate = new Date(startTime);
      const endDate = new Date(startDate.getTime() + minutes * 60000);
      setEndTime(formatDateTimeLocal(endDate));
      setGameData((prev) => ({ ...prev, endTime: endDate })); // Store as Date
    } else {
      setEndTime("");
      setGameData((prev) => ({ ...prev, endTime: undefined })); // Ensure type matches
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const gameDetails: Partial<Game> = {
      gameName,
      winningType: gameType as Game["winningType"],
      startTime: new Date(startTime),
      endTime: new Date(endTime),
      duration: parseInt(duration, 10),
      gameCode: gameData.gameCode,
    };

    setGameData((prev) => ({ ...prev, ...gameDetails }));
    onNext(gameDetails);
  };

  return (
    <div className={styles.main}>
      <MiniBingoCard type={gameType} />
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Name*
          <input
            className={styles.input}
            type="text"
            value={gameName}
            onChange={(e) => {
              setGameName(e.target.value);
              setGameData((prev) => ({ ...prev, gameName: e.target.value }));
            }}
            placeholder="Enter a name..."
            disabled={isSubmitted}
          />
        </label>

        <label className={styles.label}>
          Game Winning Type
          <select
            className={styles.input}
            value={gameType}
            onChange={(e) => {
              setGameType(e.target.value as Game["winningType"]);
              setGameData((prev) => ({ ...prev, winningType: e.target.value as Game["winningType"] }));
            }}
            disabled={isSubmitted}
          >
            <option value="one-line">One line</option>
            <option value="two-line">Two lines</option>
            <option value="three-line">Three lines</option>
            <option value="window">Window</option>
            <option value="blackout">Blackout</option>
          </select>
        </label>

        <label className={styles.label}>
          Start
          <input
            className={styles.input}
            type="datetime-local"
            value={startTime}
            onChange={(e) => {
              setStartTime(e.target.value);
              setGameData((prev) => ({ ...prev, startTime: new Date(e.target.value) }));

              if (duration) {
                const startDate = new Date(e.target.value);
                const endDate = new Date(startDate.getTime() + parseInt(duration, 10) * 60000);
                setEndTime(formatDateTimeLocal(endDate));
                setGameData((prev) => ({ ...prev, endTime: endDate }));
              }
            }}
            disabled={isSubmitted}
          />
        </label>

        <label className={styles.label}>
          Duration
          <select
            className={styles.input}
            value={duration}
            onChange={handleDurationChange}
            disabled={isSubmitted}
          >
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
            <option value="120">2 hours</option>
            <option value="180">3 hours (Default)</option>
            <option value="240">4 hours</option>
            <option value="300">5 hours</option>
            <option value="360">6 hours</option>
          </select>
        </label>

        {endTime && (
          <p className="text-sm text-gray-600">
            Game will end at: <strong>{new Date(endTime).toLocaleString()}</strong>
          </p>
        )}
        <p className="pt-12">Game Code: {gameData.gameCode || "Generating..."}</p>
      </form>
    </div>
  );
};
