import { useState } from "react";
import styles from "./CopyButton.module.scss";
import Image from "next/image";
import Copy from "../../../public/copy.svg";

interface CopyButtonProps {
  text: string;
  buttonOnly?: boolean;
}

export const CopyButton = ({ text, buttonOnly }: CopyButtonProps) => {
  const [copied, setCopied] = useState(false);

  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => setIsPressed(true);
  const handleRelease = () => setIsPressed(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <div className={styles.main}>
      <button
        onClick={handleCopy}
        onMouseDown={handlePress}
        onMouseUp={handleRelease}
        onMouseLeave={handleRelease}
        onTouchStart={handlePress}
        onTouchEnd={handleRelease}
      >
        <div
          className={`border-2 flex items-center justify-center border-black p-1 rounded transition-transform duration-100 h-10 w-10
                ${
                  isPressed
                    ? "shadow-none translate-x-1 translate-y-1"
                    : "shadow-[4px_4px_0px_black]"
                }`}
        >
          {" "}
          {/* Change to alert or tooltip */}
          <Image src={Copy} alt="copy icon" />
        </div>
      </button>
      {!buttonOnly ? (
        <p className={styles.text}>{copied ? "Copied!" : text}</p>
      ) : null}
    </div>
  );
};
