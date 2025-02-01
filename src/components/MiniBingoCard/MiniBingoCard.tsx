import styles from "./MiniBingoCard.module.scss";

interface MiniBingoCardProps {
  type: "one-line" | "two-line" | "three-line" | "window" | "blackout";
}

export const MiniBingoCard = ({ type }: MiniBingoCardProps) => {
  const totalSquares = 25;
  const getHighlightedSquares = () => {
    const highlighted: boolean[] = new Array(totalSquares).fill(false);

    switch (type) {
      case "one-line":
        [0, 6, 12, 18, 24].forEach((i) => (highlighted[i] = true));
        break;
      case "two-line":
        highlighted.fill(true, 10, 15);
        [0, 6, 12, 18, 24].forEach((i) => (highlighted[i] = true));
        break;
      case "three-line":
        highlighted.fill(true, 10, 15);
        [4, 9, 14, 19, 24].forEach((i) => (highlighted[i] = true));
        [0, 6, 12, 18, 24].forEach((i) => (highlighted[i] = true));
        break;
      case "window":
        highlighted.fill(true, 0, 5);
        highlighted.fill(true, 20, 25);
        [0, 5, 10, 15, 20].forEach((i) => (highlighted[i] = true));
        [4, 9, 14, 19, 24].forEach((i) => (highlighted[i] = true));
        break;
      case "blackout":
        highlighted.fill(true); // All squares filled
        break;
    }

    return highlighted;
  };

  const highlightedSquares = getHighlightedSquares();

  return (
    <div className={`${styles.main}`}>
      <div className="grid grid-cols-5 w-fit">
        {highlightedSquares.map((isFilled, index) => (
          <div
            key={index}
            className={`w-6 h-6 border ${
              isFilled ? "bg-black" : "bg-white border-black"
            }`}
          ></div>
        ))}
      </div>
    </div>
  );
};
