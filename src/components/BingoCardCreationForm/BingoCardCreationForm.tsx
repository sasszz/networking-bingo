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
      onSubmit(values); // Send values to Home
    }
  };

  return (
    <div className={styles.main}>
      <h2>Bingo Card Creation Form</h2>
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

      <form
        className={styles.form}
        onKeyDown={handleKeyDown}
        onSubmit={handleSubmit}
      >
        {fields.length === 24 ? (
          <input className={styles.submit} type="submit" value="Submit" />
        ) : (
          <Button buttonText={"Next"} onClick={handleNext} />
        )}
        {fields.map((_, index) => (
          <label key={index} className={styles.label}>
            Entry {fields.length - index}:
            <input
              className={styles.input}
              type="text"
              ref={(el) => {
                if (el) inputRefs.current[index] = el;
              }}
              value={values[index]}
              onChange={(e) => handleChange(index, e)}
              placeholder={`Enter something...`}
            />
          </label>
        ))}
      </form>
    </div>
  );
};
