import { useState } from "react";
import Image from "next/image";
import styles from "./IconButton.module.scss";

export enum SvgIcons {
  Share = "/share.svg",
  LinkedIn = "/linkedin.svg",
  Die = "/die.svg",
  Next = "/next.svg",
  Copy = "/copy.svg",
  Close = "/close.svg",
  Up = "/up.svg",
  Edit = "/edit.svg",
  Lock = "/lock.svg",
  Unlock = "/unlock.svg",
}

interface IconButtonProps {
  icon: SvgIcons;
  copied?: boolean;
  onClick: () => void;
  isPrev?: boolean;
  disabled?: boolean;
  text?: string;
  buttonOnly?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset";
}
export const IconButton = ({
  icon,
  copied,
  onClick,
  isPrev,
  disabled,
  text,
  buttonOnly,
  className,
  type,
}: IconButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const handlePress = () => setIsPressed(true);
  const handleRelease = () => setIsPressed(false);

  return (
    <>
      <button
        type={type ? type : "button"}
        className={`${disabled ? styles.disabled : ""} ${className || ""}`}
        onClick={onClick}
        disabled={disabled}
        onMouseDown={handlePress}
        onMouseUp={handleRelease}
        onMouseLeave={handleRelease}
        onTouchStart={handlePress}
        onTouchEnd={handleRelease}
      >
        <div
          className={`${styles.main} ${
            isPressed ? styles.pressed : styles.beforePressed
          }`}
        >
          <Image
            src={icon}
            alt={`${icon} icon`}
            width={25}
            height={25}
            style={isPrev ? { transform: "rotate(180deg)" } : {}}
          />
        </div>
      </button>
      {!buttonOnly ? (
        <p className={styles.text}>{copied ? "Copied!" : text}</p>
      ) : null}
    </>
  );
};
