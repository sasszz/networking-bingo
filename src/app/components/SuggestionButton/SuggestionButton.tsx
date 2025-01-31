import React, { useState } from "react";
import styles from "./SuggestionButton.module.scss";

interface SuggestionButtonProps {
  onUseSuggestion: (suggestion: string) => void;
}

export const SuggestionButton = ({ onUseSuggestion }: SuggestionButtonProps) => {
  const [suggestions, setSuggestions] = useState([
    "Takes the bus to work", "Commutes 30+ min", "Walks or bikes to work",
    "Owns a cat", "Owns a dog", 
    "Is drinking a beer", "Is drinking water", 
    "Is wearing a tie", "Is wearing sneakers", "Is Wearing a blazer",
    "Is a recruiter", "Works at a startup", "Works remotely",
    "Prefers dark mode", "Uses a mechanical keyboard",
    "Is DevOps", "Met a PM", "Works in Customer Support", "Ran a marathon",
    "Coding Bootcamp graduate", "Attended a hackathon", "Has given a tech talk",
    "Codes in Typescript", "Web3 developer", "Invests in crypto",
    "Uses ChatGPT", "Has switched careers", "Speaks a different language", "Took an Uber here",
    "Has an android", "Came with friends", "Attends regularly", "Volunteers"
  ]);
  

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % suggestions.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
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
        <button className={styles.arrow} onClick={handlePrev} disabled={suggestions.length === 0}>{"<"}</button>
        <span>{suggestions.length > 0 ? suggestions[currentIndex] : "No suggestions"}</span>
        <button className={styles.arrow} onClick={handleNext} disabled={suggestions.length === 0}>{">"}</button>
      </div>
      <button className={styles.button} onClick={handleUseSuggestion} disabled={suggestions.length === 0}>Use</button>
    </div>
  );
};
