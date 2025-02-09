import styles from "./ShareButton.module.scss";
import Image from "next/image";
import Share from "../../../public/share.svg";
import { useState } from "react";

interface ShareButtonProps {
  disabled?: boolean;
}

export const ShareButton = ({ disabled }: ShareButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => setIsPressed(true);
  const handleRelease = () => setIsPressed(false);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Check out this Bingo Game!",
          text: "Join me in this fun networking bingo game.",
          url: window.location.href,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      alert("Sharing is not supported on this browser.");
    }
  };

  return (
    <button
      className={`${styles.main} ${disabled ? styles.disabled : ""}`}
      onClick={disabled ? undefined : handleShare}
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
        <Image src={Share} alt="Share icon" />
      </div>
    </button>
  );
};
