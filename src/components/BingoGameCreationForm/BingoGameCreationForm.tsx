import { useState, useEffect } from "react";
import styles from "./BingoGameCreationForm.module.scss";
import { MiniBingoCard } from "../MiniBingoCard";
import { Button } from "../Button";

type BingoType = "one-line" | "two-line" | "three-line" | "window" | "blackout";

type BingoGameCreationFormProps = {
  onNext: (gameDetails: {
    gameType: BingoType;
    startTime: string;
    endTime: string;
    duration: string;
  }) => void;
};

export const BingoGameCreationForm = ({
  onNext,
}: BingoGameCreationFormProps) => {
  const [gameType, setGameType] = useState<BingoType>("one-line");
  const [startTime, setStartTime] = useState<string>("");
  const [endTime, setEndTime] = useState<string>("");
  const [duration, setDuration] = useState<string>("180");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  useEffect(() => {
    const now = new Date();
    now.setMinutes(0, 0, 0);
    now.setHours(now.getHours() + 1);

    const formattedStartTime = formatDateTimeLocal(now);
    setStartTime(formattedStartTime);

    const defaultEndTime = new Date(now.getTime() + 180 * 60000);
    setEndTime(formatDateTimeLocal(defaultEndTime));
  }, []);

  const formatDateTimeLocal = (date: Date) => {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}-${String(date.getDate()).padStart(2, "0")}T${String(
      date.getHours()
    ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const minutes = parseInt(e.target.value, 10);
    setDuration(e.target.value);

    if (startTime) {
      const startDate = new Date(startTime);
      const endDate = new Date(startDate.getTime() + minutes * 60000);
      setEndTime(formatDateTimeLocal(endDate));
    } else {
      setEndTime("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const gameDetails = {
      gameType,
      startTime,
      endTime,
      duration,
    };

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
            placeholder="Enter a name..."
            disabled={isSubmitted}
          />
        </label>
        <label className={styles.label}>
          Game Winning Type
          <select
            className={styles.input}
            value={gameType}
            onChange={(e) => setGameType(e.target.value as BingoType)}
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
              if (duration) {
                const startDate = new Date(e.target.value);
                const endDate = new Date(
                  startDate.getTime() + parseInt(duration, 10) * 60000
                );
                setEndTime(formatDateTimeLocal(endDate));
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
            Game will end at:{" "}
            <strong>{new Date(endTime).toLocaleString()}</strong>
          </p>
        )}
        <div className="self-end pt-4">
          <Button buttonText="Next" type="submit" />
        </div>
      </form>
    </div>
  );
};
