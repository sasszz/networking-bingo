"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./GameCode.module.scss";
import { Button } from "../Button";

export const GameCode = () => {
  const router = useRouter();
  const gameCodePlaceholder = "ABCDEF";

  const [code, setCode] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (code.toUpperCase() !== gameCodePlaceholder) {
      setError(true);
      return;
    }
    setError(false);
    router.push("/player/card");
  };

  return (
    <div>
      <form className={styles.form} onSubmit={handleSubmit}>
        <label className={styles.label}>
          Enter Game Code
          <input
            className={styles.input}
            type="text"
            value={code}
            onChange={(event) => {
              const value = event.target.value;
              setCode(value);
              if (value.trim()) setError(false);
            }}
            placeholder="Enter code..."
          />
        </label>
        <Button buttonText={"Submit"} disabled={error} type="submit" />
      </form>
    </div>
  );
};
