import React from "react";
import styles from "./BingoButton.module.scss";

interface BingoButtonProps {
  label: string;
}

export const BingoButton = ({ label }: BingoButtonProps) => {
  return <div className={styles.main}>{label}</div>;
};
