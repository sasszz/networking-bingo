"use client";

import { useState } from "react";
import {
  BingoCard,
  BingoCardCreationForm,
  BingoGameCreationForm,
  Button,
  TimeDigits,
} from "@/components";

export default function Admin() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    gameDetails: {},
    bingoItems: [],
  });

  const handleGameCreation = (gameDetails) => {
    setFormData((prev) => ({ ...prev, gameDetails }));
    setStep(2);
  };

  const handleCardCreation = (bingoItems) => {
    setFormData((prev) => ({ ...prev, bingoItems }));
    setStep(3);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(1, prev - 1));
  };

  const handleSubmit = async () => {
    // Send formData to Firestore or backend
    alert("Submitting Game Data");
    console.log("Submitting data:", formData);
  };

  return (
    <div className="flex flex-col items-center justify-start p-4 h-screen">
      <div className="absolute self-start">
        {step > 1 && <Button onClick={handleBack} buttonText={"Back"} />}
      </div>
      <h2>Bingo Game Setup</h2>
      <div className="absolute self-end">
        <TimeDigits value={`${step}`} />
      </div>

      {step === 1 && <BingoGameCreationForm onNext={handleGameCreation} />}
      {step === 2 && <BingoCardCreationForm onSubmit={handleCardCreation} />}
      {step === 3 && (
        <div className="flex flex-col items-center justify-center gap-12 text-center pt-12">
          <h2>Networking Bingo</h2>
          <BingoCard items={formData.bingoItems} />
          <Button onClick={handleSubmit} buttonText={"Finalize Game"} />
        </div>
      )}
    </div>
  );
}
