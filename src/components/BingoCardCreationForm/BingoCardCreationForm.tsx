"use client";

import { useState, useEffect } from "react";
import { useGame } from "@/lib/contexts/GameContext";
import styles from "./BingoCardCreationForm.module.scss";
import { IconButton, SvgIcons } from "../IconButton";
import { Button } from "../Button";

const suggestions: string[] = [
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
];

type BingoCardCreationFormProps = {
  onSubmit: (bingoItems: string[]) => void;
};

export const BingoCardCreationForm: React.FC<BingoCardCreationFormProps> = ({
  onSubmit,
}) => {
  const { bingoCardData, setBingoCardData } = useGame();
  const [values, setValues] = useState<string[]>(bingoCardData.prompts || [""]);
  const [editableFields, setEditableFields] = useState<boolean[]>(
    values.map((_, i) => i === 0)
  );

  useEffect(() => {
    setBingoCardData((prev) => ({
      ...prev,
      prompts: values,
      createdAt: prev.createdAt || new Date(),
    }));
  }, [values, setBingoCardData]);

  const handleToggleEdit = (index: number) => {
    console.log("handleToggleEdit");
    setEditableFields((prev) => {
      const newFields = [...prev];
      newFields[index] = !newFields[index];
      return newFields;
    });
  };

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (!editableFields[index]) return;
    const newValues = [...values];
    newValues[index] = event.target.value;
    setValues(newValues);
  };

  const handleNext = () => {
    if (values.length < 24 && values[0].trim() !== "") {
      setValues((prev) => ["", ...prev]);
      setEditableFields((prev) => [false, ...prev]);
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

  const handleUseSuggestion = () => {
    const unusedSuggestions = suggestions.filter((s) => !values.includes(s));
    if (!unusedSuggestions.length) return;
    const randomSuggestion =
      unusedSuggestions[Math.floor(Math.random() * unusedSuggestions.length)];
    setValues((prev) => [randomSuggestion, ...prev.slice(1)]);
  };

  const handleGenerateRandomPrompts = () => {
    const shuffled = [...suggestions].sort(() => 0.5 - Math.random());
    const randomPrompts = shuffled.slice(0, 24).reverse();
    setValues(randomPrompts);
    setEditableFields(new Array(24).fill(false));
  };

  return (
    <div className={styles.main}>
      <form
        className={styles.form}
        onKeyDown={handleKeyDown}
        onSubmit={handleSubmit}
      >
        <div className={styles.inputRow}>
          <label className={styles.label}>
            <p className="w-[20px]">1:</p>
            <input
              className={styles.input}
              type="text"
              value={values[0]}
              onChange={(e) => handleChange(0, e)}
              placeholder="Enter something..."
            />
          </label>
          <IconButton
            icon={SvgIcons.Die}
            onClick={handleUseSuggestion}
            type="button"
          />
        </div>
        <Button
          type="button"
          buttonText="Generate 24 Random prompts"
          onClick={handleGenerateRandomPrompts}
        />
        <div className={styles.prompts}>
          {values.slice(1).map((_, index) => (
            <label key={index + 1} className={styles.label}>
              <p className="w-[20px]">{index + 2}:</p>
              <input
                className={styles.input}
                type="text"
                value={values[index + 1]}
                onChange={(e) => handleChange(index + 1, e)}
                placeholder="Enter something..."
                disabled={!editableFields[index + 1]}
              />
              <IconButton
                type="button"
                icon={
                  editableFields[index + 1] ? SvgIcons.Unlock : SvgIcons.Lock
                }
                onClick={() => handleToggleEdit(index + 1)}
                className={
                  !editableFields[index + 1] ? "opacity-50 border-gray-400" : ""
                }
              />
            </label>
          ))}
        </div>
      </form>
    </div>
  );
};
