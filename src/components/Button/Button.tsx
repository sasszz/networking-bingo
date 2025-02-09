import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  buttonText: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?: () => void;
}

export const Button = ({
  buttonText,
  type,
  disabled,
  onClick,
}: ButtonProps) => {
  return (
    <button
      disabled={disabled}
      type={type ? type : "button"}
      className={styles.main}
      onClick={onClick}
    >
      {buttonText}
    </button>
  );
};
