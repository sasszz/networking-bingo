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
import {
  addBingoCard,
  addBingoGame,
  updateGameWithBingoCard,
} from "@/lib/firebase/calls";

export default function CreateGamePage(): JSX.Element {
  return (
    <GameProvider>
      <GameContent />
    </GameProvider>
  );
}

function GameContent(): JSX.Element {
  const {
    step,
    setStep,
    gameData,
    setGameData,
    setBingoCardData,
    bingoCardData,
  } = useGame();
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isStep1Invalid =
    step === 1 && (!gameData?.gameName || gameData.gameName.trim() === "");
  const isStep2Invalid =
    step === 2 &&
    (!bingoCardData?.prompts ||
      bingoCardData.prompts.length < 24 ||
      bingoCardData.prompts.some((prompt) => prompt.trim() === ""));

  const isNextDisabled = isStep1Invalid || isStep2Invalid;

  const errorMessage = isStep1Invalid
    ? "Please enter a game name."
    : isStep2Invalid
    ? "You need 24 prompts to continue."
    : "";

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
    if (!isNextDisabled) {
      setStep(step < 3 ? step + 1 : 3);
    }
  };

  const handlePrev = () => {
    setStep(step > 1 ? step - 1 : 1);
  };

  const handleFinalSubmit = async () => {
    try {
      setIsSubmitting(true); // Freeze screen
      console.log("Submitting game data...");

      // Step 1: Create Bingo Card
      const bingoCard = await addBingoCard(bingoCardData.prompts ?? []);

      // Step 2: Create Bingo Game and link the Bingo Card
      const gameResponse = await addBingoGame({
        gameName: gameData.gameName ?? "",
        //@ts-expect-error types issue
        startTime: gameData.startTime ?? new Date().toISOString(),
        duration: gameData.duration ?? 0,
        gameCode: gameData.gameCode ?? "",
        players: gameData.players || [],
        //@ts-expect-error types issue
        winningType: gameData.winningType ?? "",
        bingoCardId: bingoCard.bingoCardId,
      });

      // Step 3: Update the created game with Bingo Card ID
      await updateGameWithBingoCard(gameResponse.gameId, bingoCard.bingoCardId);

      console.log("Game and Bingo Card successfully linked!");
      router.push(`/admin`);
    } catch (error) {
      console.error("Error submitting game:", error);
    } finally {
      setIsSubmitting(false);
    }
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

      {isSubmitting && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-80 z-50">
          <div className="bg-white px-12 py-4 rounded-lg shadow-[6px_6px_0px_black] border-4 border-black">
            <p className="text-lg font-semibold">Submitting game...</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="flex justify-between items-center w-full p-4 bg-gray-300 fixed top-0 left-0 z-10">
        <Button buttonText="Cancel" onClick={handleCancel} />
        <h2>Bingo Game Setup</h2>
        <TimeDigits value={`${step}/3`} />
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-lg mx-auto overflow-y-auto pt-24">
        {step === 1 && <BingoGameCreationForm onNext={handleGameCreation} />}
        {step === 2 && <BingoCardCreationForm onSubmit={handleCardCreation} />}
        {step === 3 && (
          <div className="flex flex-col items-start justify-start gap-12 text-center">
            <GameDisplay />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="flex flex-col justify-between items-center text-center w-full fixed bottom-0 left-0 z-10">
        {errorMessage ? (
          <p className="p-4 bg-red-300 w-full">{errorMessage}</p>
        ) : null}
        <div className="flex p-4 flex-row justify-between w-full  bg-gray-300 ">
          <Button
            onClick={handlePrev}
            buttonText="Previous"
            disabled={step === 1}
          />
          {step < 3 ? (
            <Button
              onClick={handleNext}
              disabled={isNextDisabled}
              buttonText="Next"
            />
          ) : (
            <Button onClick={handleFinalSubmit} buttonText="Submit Game" />
          )}
        </div>
      </footer>
    </div>
  );
}
