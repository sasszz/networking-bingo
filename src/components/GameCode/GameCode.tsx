"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./GameCode.module.scss";
import { Button } from "../Button";

export const GameCode = () => {
  const router = useRouter();
  const gameCodePlaceholder = "abcdef";

  const [code, setCode] = useState("abcdef");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (code !== gameCodePlaceholder) {
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
          Display Name
          <input
            className={styles.input}
            type="text"
            value={displayName}
            onChange={(event) => {
              const value = event.target.value;
              setDisplayName(value);
              // if (value.trim()) setError(false);
            }}
            placeholder="Enter display name..."
          />
        </label>
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
        <Button buttonText={"Enter Game"} disabled={error} type="submit" />
      </form>
    </div>
  );
};
