"use client";

import { useState } from "react";
import { BingoCard, BingoCardCreationForm } from "@/app/components";

export default function Home() {
  const [bingoItems, setBingoItems] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (values: string[]) => {
    setBingoItems(values);
    setSubmitted(true);
  };

  return (
    <div className="flex items-center justify-center">
      {submitted ? (
        <BingoCard items={bingoItems} />
      ) : (
        <BingoCardCreationForm onSubmit={handleSubmit} />
      )}
    </div>
  );
}
