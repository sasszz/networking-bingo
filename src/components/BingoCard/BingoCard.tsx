import { BingoButton } from "../BingoButton";
import styles from "./BingoCard.module.scss";

interface BingoCardProps {
  items: string[];
}

export const BingoCard = ({ items }: BingoCardProps) => {
  const updatedItems = [...items.slice(0, 12), "FREE", ...items.slice(12)];

  return (
    <div className={styles.main}>
      <div className="grid grid-cols-5 w-fit">
        {updatedItems.map((item, index) => (
          <BingoButton key={index} label={item} isFree={item === "FREE"} />
        ))}
      </div>
    </div>
  );
};
