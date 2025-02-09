"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import styles from "./ShareGameModal.module.scss";
import { CopyButton } from "../CopyButton";
import { Button } from "../Button";
import { CloseButton } from "../CloseButton";
import { ShareButton } from "../ShareButton";

export const ShareGameModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const testLink = "http://localhost:3000/player/card";
  const testCode = "ABCDEF";

  return (
    <div>
      <Button buttonText="Share Game" onClick={() => setIsOpen(true)} />
      {isOpen && (
        <div className={styles.opacityBackground}>
          <div className={styles.main}>
            <div className={styles.close}>
              <CloseButton onClick={() => setIsOpen(false)} />
            </div>
            <div className="w-28 h-28">
              <QRCode
                value={testLink}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              />
            </div>
            <p>Game Code:</p>
            <CopyButton text={testCode} />
            <ShareButton />
          </div>
        </div>
      )}
    </div>
  );
};
