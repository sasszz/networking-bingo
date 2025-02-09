import React, { useState } from "react";
import styles from "./SuggestionButton.module.scss";
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

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % suggestions.length);
  };

  const handlePrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + suggestions.length) % suggestions.length
    );
  };

  const handleUseSuggestion = () => {
    const selectedSuggestion = suggestions[currentIndex];
    onUseSuggestion(selectedSuggestion); // Send suggestion to input field
    setSuggestions(suggestions.filter((_, i) => i !== currentIndex)); // Remove used suggestion
    setCurrentIndex(0); // Reset to first suggestion
  };

  return (
    <div className={styles.main}>
      <div className={styles.selectionBox}>
        <Button
          buttonText="<"
          onClick={handlePrev}
          disabled={suggestions.length === 0}
        />
        <span>
          {suggestions.length > 0
            ? suggestions[currentIndex]
            : "No suggestions"}
        </span>
        <Button
          buttonText=">"
          onClick={handleNext}
          disabled={suggestions.length === 0}
        />
      </div>
      <Button
        buttonText="Use"
        onClick={handleUseSuggestion}
        disabled={suggestions.length === 0}
      />
    </div>
  );
};
