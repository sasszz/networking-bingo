"use client";

import { useState } from "react";
import QRCode from "react-qr-code";
import styles from "./ShareGameModal.module.scss";
import { Button } from "../Button";
import { IconButton, SvgIcons } from "../IconButton";
import { handleShare } from "../utilities";

interface ShareGameModalProps {
  gameCode?: string;
}


export const ShareGameModal = ({ gameCode }: ShareGameModalProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const testLink = "http://localhost:3000/player/card";

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
            <div className={styles.shareBody}>
              <p>Scan to Join Game!</p>
              <div className="w-28 h-28">
                <QRCode
                  value={testLink}
                  style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                />
              </div>
              <IconButton
                icon={SvgIcons.Share}
                onClick={() => handleShare(gameCode)}
              />
              <p>Game Code: {gameCode}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
