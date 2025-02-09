import styles from "./LinkedInButton.module.scss";
import Image from "next/image";
import LinkedIn from "../../../public/linkedin.svg";
import { useState } from "react";

interface LinkedInButtonProps {
  username: string;
  disabled?: boolean;
}

export const LinkedInButton = ({ username, disabled }: LinkedInButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => setIsPressed(true);
  const handleRelease = () => setIsPressed(false);

  const link = `https://www.linkedin.com/in/${username}/`;

  const handleClick = () => {
    if (!disabled) {
      window.open(link, "_blank");
    }
  };

  return (
    <button
      className={`${styles.main} ${disabled ? styles.disabled : ""}`}
      onClick={disabled ? undefined : handleClick}
      disabled={disabled}
      onMouseDown={handlePress}
      onMouseUp={handleRelease}
      onMouseLeave={handleRelease}
      onTouchStart={handlePress}
      onTouchEnd={handleRelease}
    >
      <div
        className={`border-2 border-black p-1 rounded transition-transform duration-100 h-10 w-10
              ${
                isPressed
                  ? "shadow-none translate-x-1 translate-y-1"
                  : "shadow-[4px_4px_0px_black]"
              }`}
      >
        <Image src={LinkedIn} alt="LinkedIn icon" />
      </div>
    </button>
  );
};
