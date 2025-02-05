"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import styles from "./ShareGameModal.module.scss";
import { CopyButton } from "../CopyButton";

export const ShareGameModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const testLink = "http://localhost:3000/player/card";
  const testCode = "ABCDEF";

  return (
    <div>
      <button
        type="button"
        className={styles.submit}
        onClick={() => setIsOpen(true)}
      >
        Share Game
      </button>
      {isOpen && (
        <div className={styles.opacityBackground}>
          <div className={styles.main}>
            <button
              className={styles.closeButton}
              onClick={() => setIsOpen(false)}
            >
              X
            </button>
            <div className="w-28 h-28">
              <QRCode
                value={testLink}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              />
            </div>
            <p>Game Code:</p>
            <CopyButton text={testCode} />
            <CopyButton text={testLink} />
          </div>
        </div>
      )}
    </div>
  );
};
