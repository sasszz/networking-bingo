import React, { useState } from "react";
import styles from "./SuggestionButton.module.scss";
import Image from "next/image";
import Next from "../../../public/next.svg";
import { Button } from "../Button";

interface SuggestionButtonProps {
  onUseSuggestion: (suggestion: string) => void;
}

export const SuggestionButton = ({
  onUseSuggestion,
}: SuggestionButtonProps) => {
  const [suggestions, setSuggestions] = useState([
    "takes the bus to work",
    "commutes 30+ min",
    "walks or bikes to work",
    "owns a cat",
    "owns a dog",
    "drinking a beer",
    "drinking water",
    "wearing a tie",
    "wearing sneakers",
    "Wearing a blazer",
    "recruiter",
    "works at a startup",
    "works remote",
    "prefers dark mode",
    "devops",
    "pm",
    "cx",
    "ran a marathon",
    "bootcamp grad",
    "attended a hackathon",
    "gave a tech talk",
    "typescript dev",
    "web3 degen",
    "uses chatgpt",
    "career switcher",
    "speaks a different language",
    "took an Uber here",
    "android",
    "came with friends",
    "attends regularly",
    "volunteers",
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPrevPressed, setIsPrevPressed] = useState(false);
  const [isNextPressed, setIsNextPressed] = useState(false);

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + suggestions.length) % suggestions.length
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % suggestions.length);
  };

  const handleUseSuggestion = () => {
    const selectedSuggestion = suggestions[currentIndex];
    onUseSuggestion(selectedSuggestion);
    setSuggestions(suggestions.filter((_, i) => i !== currentIndex));
    setCurrentIndex(0);
  };

  return (
    <div className={styles.main}>
      <div className={styles.selectionBox}>
        <button
          onClick={handlePrev}
          disabled={suggestions.length === 0}
          onMouseDown={() => setIsPrevPressed(true)}
          onMouseUp={() => setIsPrevPressed(false)}
          onMouseLeave={() => setIsPrevPressed(false)}
          onTouchStart={() => setIsPrevPressed(true)}
          onTouchEnd={() => setIsPrevPressed(false)}
        >
          <div
            className={`border-2 border-black p-1 rounded transition-transform duration-100 h-10 w-10
                ${
                  isPrevPressed
                    ? "shadow-none translate-x-1 translate-y-1"
                    : "shadow-[4px_4px_0px_black]"
                }`}
          >
            <Image src={Next} alt="Next icon" className="rotate-180" />
          </div>
        </button>
        <span>
          {suggestions.length > 0
            ? suggestions[currentIndex]
            : "No suggestions"}
        </span>
        <button
          onClick={handleNext}
          disabled={suggestions.length === 0}
          onMouseDown={() => setIsNextPressed(true)}
          onMouseUp={() => setIsNextPressed(false)}
          onMouseLeave={() => setIsNextPressed(false)}
          onTouchStart={() => setIsNextPressed(true)}
          onTouchEnd={() => setIsNextPressed(false)}
        >
          <div
            className={`border-2 border-black p-1 rounded transition-transform duration-100 h-10 w-10
                ${
                  isNextPressed
                    ? "shadow-none translate-x-1 translate-y-1"
                    : "shadow-[4px_4px_0px_black]"
                }`}
          >
            <Image src={Next} alt="Next icon" />
          </div>
        </button>
      </div>
      <Button
        buttonText="Use"
        onClick={handleUseSuggestion}
        disabled={suggestions.length === 0}
      />
    </div>
  );
};
