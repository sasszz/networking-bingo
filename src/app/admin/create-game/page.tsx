"use client";

import { useState } from "react";
import {
  BingoCard,
  BingoCardCreationForm,
  BingoGameCreationForm,
  Button,
  TimeDigits,
} from "@/components";
import { GameDetails, BingoItems } from "@/types";
import { addBingoGame } from "@/lib/firebase/calls";

interface FormData {
  gameDetails: GameDetails;
  bingoItems: BingoItems;
}

export default function Admin() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    gameDetails: {
      gameType: "one-line",
      startTime: "",
      endTime: "",
      duration: "",
    },
    bingoItems: [],
  });

  const handleGameCreation = (gameDetails: GameDetails) => {
    setFormData((prev) => ({ ...prev, gameDetails }));
    setStep(2);
  };

  const handleCardCreation = (bingoItems: BingoItems) => {
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

  const [loading, setLoading] = useState(false);

  const handleCreateGame = async () => {
    setLoading(true);
    try {
      const gameId = await addBingoGame({
        gameName: "Networking Bingo Night",
        startTime: new Date("2025-02-17T13:00:00"),
        endTime: new Date("2025-02-17T15:00:00"),
        duration: 120,
        // boardItems: [
        //   "takes the bus to work",
        //   "commutes 30+ min",
        //   "walks or bikes to work",
        //   "cat person",
        //   "owns a dog",
        //   "drinking a beer",
        //   "drinking water",
        //   "wearing a tie",
        //   "wearing sneakers",
        //   "ubered",
        //   "recruiter",
        //   "works at a startup",
        //   "works remote",
        //   "prefers dark mode",
        //   "devops",
        //   "project manager",
        //   "cx rep",
        //   "ran a marathon",
        //   "bootcamp grad",
        //   "attended a hackathon",
        //   "gave a tech talk",
        //   "typescript dev",
        //   "web3 degen",
        //   "uses chatgpt",
        // ],
        winningType: "one-line",
        players: [],
        bingoCardId: "",
      });
      alert(`Game created with ID: ${gameId}`);
    } catch (error) {
      console.error("Error creating game:", error);
      alert("Failed to create game.");
    } finally {
      setLoading(false);
    }
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
      <Button
        buttonText={"Create Test Game"}
        onClick={handleCreateGame}
        disabled={loading}
      />

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
