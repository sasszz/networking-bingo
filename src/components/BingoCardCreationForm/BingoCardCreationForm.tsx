"use client";

import { useState, useRef, useEffect } from "react";
import { useGame } from "@/lib/contexts/GameContext";
import styles from "./BingoCardCreationForm.module.scss";
import { SuggestionButton } from "../SuggestionButton";

export const BingoCardCreationForm = ({
  onSubmit,
}: {
  onSubmit: (bingoItems: string[]) => void;
}) => {
  const { bingoCardData, setBingoCardData } = useGame();
  const [values, setValues] = useState<string[]>(bingoCardData.prompts || [""]);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Sync `bingoCardData` whenever `values` changes
  useEffect(() => {
    setBingoCardData((prev) => ({
      ...prev,
      prompts: values,
      createdAt: prev.createdAt || new Date(),
    }));
  }, [values, setBingoCardData]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [values]);

  const handleChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
    const newValues = [...values];
    newValues[index] = event.target.value;
    setValues(newValues);
  };

  const handleNext = () => {
    if (values.length < 24 && values[0].trim() !== "") {
      setValues((prev) => ["", ...prev]);
      setCurrentFieldIndex(0);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLFormElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleNext();
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (values.length === 24 && values.every((val) => val.trim() !== "")) {
      onSubmit(values);
    }
  };

  return (
    <div className={styles.main}>
      <div>
        <p>prompt suggestion box</p>
        <SuggestionButton
          onUseSuggestion={(suggestion) => {
            setValues((prevValues) => {
              const newValues = [...prevValues];
              newValues[currentFieldIndex] = suggestion;
              return newValues;
            });
            if (values.length < 24) {
              setValues((prevValues) => ["", ...prevValues]);
              setCurrentFieldIndex(0);
            }
          }}
        />
      </div>

      <form className={styles.form} onKeyDown={handleKeyDown} onSubmit={handleSubmit}>
        <div className={styles.inputRow}>
          <label className={styles.label}>
            <p className="w-[20px]">{values.length}:</p>
            <input
              className={styles.input}
              type="text"
              ref={(el) => {
                if (el) inputRefs.current[0] = el;
              }}
              value={values[0]}
              onChange={(e) => handleChange(0, e)}
              placeholder="Enter something..."
            />
          </label>
        </div>
        <div className={styles.prompts}>
          <p>bingo card prompts</p>
          {values.slice(1).map((_, index) => (
            <label key={index + 1} className={styles.label}>
              <p className="w-[20px]">{values.length - (index + 1)}:</p>
              <input
                className={styles.input}
                type="text"
                ref={(el) => {
                  if (el) inputRefs.current[index + 1] = el;
                }}
                value={values[index + 1]}
                onChange={(e) => handleChange(index + 1, e)}
                placeholder="Enter something..."
              />
            </label>
          ))}
        </div>
      </form>
    </div>
  );
};
