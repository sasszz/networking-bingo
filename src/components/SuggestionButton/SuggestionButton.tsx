import React, { useState } from "react";
import styles from "./SuggestionButton.module.scss";
import { Button } from "../Button";
import { IconButton, SvgIcons } from "../IconButton";

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
        <IconButton icon={SvgIcons.Next} onClick={handlePrev} isPrev={true} />
        <span>
          {suggestions.length > 0
            ? suggestions[currentIndex]
            : "No suggestions"}
        </span>
        <IconButton icon={SvgIcons.Next} onClick={handleNext} />
      </div>
      <Button
        buttonText="Use"
        onClick={handleUseSuggestion}
        disabled={suggestions.length === 0}
      />
    </div>
  );
};
