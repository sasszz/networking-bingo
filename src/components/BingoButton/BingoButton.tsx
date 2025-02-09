import React, { useState } from "react";
import { ReactFitty } from "react-fitty";
import styles from "./BingoButton.module.scss";
import { BingoButtonModal } from "../BingoButtonModal";

interface BingoButtonProps {
  label: string;
  isFree: boolean;
  isChecked: boolean;
  onClick: () => void;
}

export const BingoButton = ({
  label,
  isFree,
  isChecked,
  onClick,
}: BingoButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(isChecked);

  return (
    <>
      <button
        className={`${styles.main} ${
          isSubmitted || isFree ? styles.completed : ""
        }`}
        onClick={() => (isFree ? null : setIsOpen(true))}
      >
        <ReactFitty wrapText>{label}</ReactFitty>
      </button>

      {isOpen && (
        <BingoButtonModal
          label={label}
          onClose={() => setIsOpen(false)}
          onSuccess={() => {
            setIsSubmitted(true);
            onClick();
          }}
          completed={isSubmitted}
        />
      )}
    </>
  );
};
