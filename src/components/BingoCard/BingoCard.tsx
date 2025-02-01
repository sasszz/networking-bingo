import { useState } from "react";
import { BingoButton } from "../BingoButton";
import styles from "./BingoCard.module.scss";

interface BingoCardProps {
  items: string[];
}

export const BingoCard = ({ items }: BingoCardProps) => {
  const updatedItems = [...items.slice(0, 12), "FREE", ...items.slice(12)];
  const [checked, setChecked] = useState<boolean[]>(
    Array.from({ length: 25 }, (_, i) => i === 12)
  );
  const toggleSquare = (index: number) => {
    setChecked((prev) => {
      const newChecked = [...prev];
      newChecked[index] = true; // Mark square as checked
      return newChecked;
    });
  };

  const checkForBingo = () => {
    // Check rows
    for (let row = 0; row < 5; row++) {
      if (checked.slice(row * 5, row * 5 + 5).every(Boolean)) return true;
    }

    // Check columns
    for (let col = 0; col < 5; col++) {
      if ([0, 1, 2, 3, 4].every((row) => checked[row * 5 + col])) return true;
    }

    // Check diagonals
    const diagonal1 = [0, 6, 12, 18, 24].every((i) => checked[i]);
    const diagonal2 = [4, 8, 12, 16, 20].every((i) => checked[i]);

    return diagonal1 || diagonal2;
  };

  return (
    <div className={styles.main}>
      <div className="grid grid-cols-5 w-fit">
        {updatedItems.map((item, index) => (
          <BingoButton
            key={index}
            label={item}
            isChecked={checked[index]}
            isFree={item === "FREE"}
            onClick={() => toggleSquare(index)}
          />
        ))}
      </div>
      {checkForBingo() && <p className="text-green-500 mt-2">BINGO!</p>}
    </div>
  );
};
