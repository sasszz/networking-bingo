"use client";

import { useState } from "react";
import { BingoCard, BingoCardCreationForm } from "@/components";

export default function Admin() {
  const [bingoItems, setBingoItems] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (values: string[]) => {
    setBingoItems(values);
    setSubmitted(true);
  };

  return (
    <div className="flex items-start justify-center h-screen">
      {submitted ? (
        <div className="flex flex-col gap-24 text-center">
          <h2>Networking Bingo</h2>
          <BingoCard items={bingoItems} />
        </div>
      ) : (
        <BingoCardCreationForm onSubmit={handleSubmit} />
      )}
    </div>
  );
}
