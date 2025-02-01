import React, { useState } from "react";
import styles from "./BingoButton.module.scss";
import { BingoButtonModal } from "../BingoButtonModal";

interface BingoButtonProps {
  label: string;
  isFree: boolean;
}

export const BingoButton = ({ label, isFree }: BingoButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <>
      <button
        className={`${styles.main} ${
          isSubmitted || isFree ? styles.completed : ""
        }`}
        onClick={() => (isFree || isSubmitted ? null : setIsOpen(true))}
      >
        {label}
      </button>

      {isOpen && (
        <BingoButtonModal
          label={label}
          onClose={() => setIsOpen(false)}
          onSuccess={() => setIsSubmitted(true)} // Update state on success
        />
      )}
    </>
  );
};
