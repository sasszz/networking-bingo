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
    <div className={styles.main} onClick={handleCopy}>
      <div className={styles.textAndButton}>
        {/* Change to alert or tooltip */}
        {!buttonOnly ? (
          <p className={styles.text}>{copied ? "Copied!" : text}</p>
        ) : null}
        <Image src={Copy} alt="copy icon" className={styles.icon} />
      </div>
    </div>
  );
};
