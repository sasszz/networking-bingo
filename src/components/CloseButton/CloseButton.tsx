import React, { useState } from "react";
import Close from "../../../public/close.svg";
import Image from "next/image";

interface CloseButtonProps {
  onClick: () => void;
}

export const CloseButton = ({ onClick }: CloseButtonProps) => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => setIsPressed(true);
  const handleRelease = () => setIsPressed(false);

  return (
    <button
      type="button"
      onClick={onClick}
      onMouseDown={handlePress}
      onMouseUp={handleRelease}
      onMouseLeave={handleRelease}
      onTouchStart={handlePress}
      onTouchEnd={handleRelease}
    >
      <div
        className="border-2 border-black p-1 rounded"
        style={{
          boxShadow: isPressed ? "none" : "4px 4px 0px black",
          transform: isPressed ? "translate(4px, 4px)" : "none",
          transition: "box-shadow 0.1s ease-in-out, transform 0.1s ease-in-out",
        }}
      >
        <Image src={Close} alt="close icon" />
      </div>
    </button>
  );
};
