"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import styles from "./ShareGameModal.module.scss";
import { Button } from "../Button";
import { IconButton, SvgIcons } from "../IconButton";
import { handleCopy, handleShare } from "../utilities";

export const ShareGameModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const testLink = "http://localhost:3000/player/card";
  const testCode = "ABCDEF";

  return (
    <div>
      <Button buttonText="Share Game" onClick={() => setIsOpen(true)} />
      {isOpen && (
        <div className={styles.opacityBackground}>
          <div className={styles.main}>
            <div className={styles.close}>
              <IconButton
                icon={SvgIcons.Close}
                onClick={() => setIsOpen(false)}
              />
            </div>
            <div className="w-28 h-28">
              <QRCode
                value={testLink}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
              />
            </div>
            <p>Game Code:</p>
            <IconButton
              icon={SvgIcons.Copy}
              text={testCode}
              copied={copied}
              onClick={() => handleCopy(testCode, setCopied)}
            />
            <IconButton
              icon={SvgIcons.Share}
              onClick={() => handleShare(testCode)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
