"use client";

import { JSX, useState } from "react";
import { useRouter } from "next/navigation";
import { useGame, GameProvider } from "@/lib/contexts/GameContext";
import {
  BingoCardCreationForm,
  BingoGameCreationForm,
  GameDisplay,
  Button,
  TimeDigits,
  ConfirmationModal,
} from "@/components";

export default function CreateGamePage(): JSX.Element {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}

function GameContent(): JSX.Element {
  const { step, setStep, setGameData, setBingoCardData } = useGame();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);

  const handleGameCreation = (
    gameDetails: Partial<Record<string, unknown>>
  ) => {
    console.log("handleGameCreation");
    setGameData((prev) => ({ ...prev, ...gameDetails }));
    setStep(2);
  };

  const handleCardCreation = (bingoItems: string[]) => {
    setBingoCardData((prev) => ({ ...prev, prompts: bingoItems }));
    setStep(3);
  };

  const handleNext = () => {
    setStep(step < 3 ? step + 1 : 3);
  };

  const handlePrev = () => {
    setStep(step > 1 ? step - 1 : 1);
  };

  const handleFinalSubmit = () => {
    console.log("Submitting game data...");
  };

  const handleCancel = () => {
    setShowModal(true);
  };

  const confirmCancel = () => {
    setShowModal(false);
    router.push("/admin");
  };

  return (
    <div className="flex flex-col h-screen w-full">
      {showModal && (
        <ConfirmationModal
          message="Are you sure you want to cancel? All progress will be lost."
          onConfirm={confirmCancel}
          onCancel={() => setShowModal(false)}
        />
      )}

      {/* Header */}
      <header className="flex justify-between items-center w-full p-4 bg-gray-300 fixed top-0 left-0 z-10">
        <Button buttonText="Cancel" onClick={handleCancel} />
        <h2>Bingo Game Setup</h2>
        <TimeDigits value={`${step}/3`} />
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-lg mx-auto overflow-y-auto pt-12">
        {step === 1 && <BingoGameCreationForm onNext={handleGameCreation} />}
        {step === 2 && <BingoCardCreationForm onSubmit={handleCardCreation} />}
        {step === 3 && (
          <div className="flex flex-col items-center justify-center gap-12 text-center pt-12">
            <GameDisplay />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="flex justify-between items-center w-full p-4 bg-gray-300 fixed bottom-0 left-0 z-10">
        <Button
          onClick={handlePrev}
          buttonText="Previous"
          disabled={step === 1}
        />
        {step < 3 ? (
          <Button onClick={handleNext} buttonText="Next" />
        ) : (
          <Button onClick={handleFinalSubmit} buttonText="Submit Game" />
        )}
      </footer>
    </div>
  );
}
