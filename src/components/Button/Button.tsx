import React, { useState } from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  buttonText: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  onClick?:
    | (() => void)
    | ((event: React.MouseEvent<HTMLButtonElement>) => void);
}

export const Button = ({
  buttonText,
  type,
  disabled,
  onClick,
}: ButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => setIsPressed(true);
  const handleRelease = () => setIsPressed(false);

  return (
    <button
      disabled={disabled}
      type={type ? type : "button"}
      onClick={onClick}
      onMouseDown={handlePress}
      onMouseUp={handleRelease}
      onMouseLeave={handleRelease}
      onTouchStart={handlePress}
      onTouchEnd={handleRelease}
      className={`${styles.main} ${
        isPressed ? styles.pressed : styles.beforePressed
      } ${disabled ? styles.disabled : ""}`}
    >
      {buttonText}
    </button>
  );
};
