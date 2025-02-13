"use client";
import { useState, useRef, useEffect } from "react";
import styles from "./BingoCardCreationForm.module.scss";
import { SuggestionButton } from "../SuggestionButton";
import { Button } from "../Button";

interface BingoCardCreationFormProps {
  onSubmit: (values: string[]) => void;
}

export const BingoCardCreationForm = ({
  onSubmit,
}: BingoCardCreationFormProps) => {
  const [fields, setFields] = useState([""]);
  const [values, setValues] = useState([""]);
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, [fields]);

  const handleChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValues = [...values];
    newValues[index] = event.target.value;
    setValues(newValues);
  };

  const handleNext = () => {
    if (fields.length < 24 && values[0].trim() !== "") {
      setFields((prev) => ["", ...prev]);
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
            if (fields.length < 24) {
              setFields((prevFields) => ["", ...prevFields]);
              setValues((prevValues) => ["", ...prevValues]);
              setCurrentFieldIndex(0);
            }
          }}
        />
      </div>

      <form
        className={styles.form}
        onKeyDown={handleKeyDown}
        onSubmit={handleSubmit}
      >
        <div className={styles.inputRow}>
          <label className={styles.label}>
            <p className="w-[20px]">{fields.length}:</p>
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
          <div className="w-[100px]">
            {fields.length === 24 ? (
              <Button
                buttonText="Submit"
                type="submit"
                disabled={values[0].trim() === ""}
              />
            ) : (
              <Button buttonText="Next" onClick={handleNext} />
            )}
          </div>
        </div>
        <div className={styles.prompts}>
          <p>bingo card prompts</p>
          {fields.slice(1).map((_, index) => (
            <label key={index + 1} className={styles.label}>
              <p className="w-[20px]">{fields.length - (index + 1)}:</p>
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
