import styles from "./MiniBingoCard.module.scss";
import { getHighlightedSquares } from "./get-highlighted-squares";

interface MiniBingoCardProps {
  type?: "one-line" | "two-line" | "three-line" | "window" | "blackout";
  filledCoordinates?: [number, number][];
}

export const MiniBingoCard = ({
  type,
  filledCoordinates,
}: MiniBingoCardProps) => {
  const highlightedSquares = getHighlightedSquares(type, filledCoordinates);

  return (
    <div className={`${styles.main}`}>
      <div className="grid grid-cols-5 w-fit">
        {highlightedSquares.map((isFilled, index) => (
          <div
            key={index}
            className={`w-6 h-6 ${
              isFilled ? "bg-black" : "bg-white border border-black"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};

export const MiniMiniBingoCard = ({
  type,
  filledCoordinates,
}: MiniBingoCardProps) => {
  const highlightedSquares = getHighlightedSquares(type, filledCoordinates);

  return (
    <div className={styles.main}>
      <div className="grid grid-cols-5 w-fit">
        {highlightedSquares.map((isFilled, index) => (
          <div
            key={index}
            className={`w-2 h-2 ${
              isFilled ? "bg-black" : "bg-white border border-black"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};
