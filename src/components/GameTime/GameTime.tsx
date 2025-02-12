import { useState, useEffect } from "react";
import styles from "./GameTime.module.scss";

interface GameTimeProps {
  startTime: string | number | Date;
  endTime: string | number | Date;
}

export const GameTime: React.FC<GameTimeProps> = ({ startTime, endTime }) => {
  const [timeLeft, setTimeLeft] = useState<{
    hours: string;
    minutes: string;
    seconds: string;
  } | null>(null);
  const [statusText, setStatusText] = useState<string>("");

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const start = new Date(startTime);
      const end = new Date(endTime);

      if (now < start) {
        setStatusText(`Starts on: ${formatDateTime(startTime)}`);
        setTimeLeft(null);
      } else if (now > end) {
        setStatusText(`Ended on: ${formatDateTime(endTime)}`);
        setTimeLeft(null);
      } else {
        const remaining = Math.max(0, end.getTime() - now.getTime());
        const hours = Math.floor(remaining / 3600000)
          .toString()
          .padStart(2, "0");
        const minutes = Math.floor((remaining % 3600000) / 60000)
          .toString()
          .padStart(2, "0");
        const seconds = Math.floor((remaining % 60000) / 1000)
          .toString()
          .padStart(2, "0");

        setStatusText("game time remaining:");
        setTimeLeft({ hours, minutes, seconds });
      }
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [startTime, endTime]);

  return (
    <div className={styles.main}>
      <p>{statusText}</p>
      {timeLeft && (
        <div className={styles.timeClockRow}>
          {timeLeft.hours !== "00" && (
            <>
              <TimeDigits value={timeLeft.hours} />
              <span>h</span>
            </>
          )}
          <TimeDigits value={timeLeft.minutes} />
          <span>m</span>
          <TimeDigits value={timeLeft.seconds} />
          <span>s</span>
        </div>
      )}
    </div>
  );
};

const TimeDigits: React.FC<{ value: string }> = ({ value }) => (
  <div className={styles.timeDigits}>
    {value.split("").map((digit, index) => (
      <TimeBox key={index} value={digit} />
    ))}
  </div>
);

const TimeBox: React.FC<{ value: string }> = ({ value }) => (
  <div className={styles.timeBox}>{value}</div>
);

const formatDateTime = (date: string | number | Date): string => {
  const d = new Date(date);
  return (
    d.toLocaleDateString("en-US", {
      weekday: "long",
      month: "long",
      day: "numeric",
    }) +
    ", " +
    d.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  );
};
