import {
  collection,
  addDoc,
  Timestamp,
  updateDoc,
  doc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "@/lib/firebase/config";
import { BingoCard, Game } from "@/lib/types/database";

export async function addBingoGame({
  gameName,
  startTime,
  duration,
  gameCode,
  players = [],
  winningType,
  bingoCardId = "",
}: Omit<Game, "status" | "createdAt" | "gameId" | "adminId">) {
  try {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      throw new Error("User is not authenticated");
    }

    const adminId = user.uid;
    const now = new Date();
    const start = new Date(startTime);
    const end = new Date(start);
    end.setMinutes(end.getMinutes() + duration);

    let status: "scheduled" | "active" | "ended";
    if (now < start) {
      status = "scheduled";
    } else if (now >= start && now < end) {
      status = "active";
    } else {
      status = "ended";
    }

    // Add game to Firestore and use the generated document ID as gameId
    const docRef = await addDoc(collection(db, "bingoGames"), {
      adminId,
      gameName,
      gameCode,
      status,
      startTime: Timestamp.fromDate(start),
      endTime: Timestamp.fromDate(end),
      winningType,
      bingoCardId,
      players,
      createdAt: Timestamp.now(),
    });

    console.log("Game created with ID:", docRef.id);

    return { gameId: docRef.id, gameCode };
  } catch (error) {
    console.error("Error adding bingo game:", error);
    throw new Error("Failed to create bingo game");
  }
}

export async function addBingoCard(prompts: string[]): Promise<BingoCard> {
  try {
    if (prompts.length !== 24) {
      throw new Error("A bingo card must have exactly 24 prompts");
    }

    // Add bingo card to Firestore and use Firestore-generated ID
    const docRef = await addDoc(collection(db, "bingoCards"), {
      prompts,
      createdAt: Timestamp.now(),
    });

    console.log("Bingo card created with ID:", docRef.id);

    return {
      bingoCardId: docRef.id,
      prompts,
      createdAt: new Date(),
    };
  } catch (error) {
    console.error("Error adding bingo card:", error);
    throw new Error("Failed to create bingo card");
  }
}

export async function updateGameWithBingoCard(
  gameId: string,
  bingoCardId: string
) {
  try {
    const gameRef = doc(db, "bingoGames", gameId);
    await updateDoc(gameRef, { bingoCardId });

    console.log(`Game ${gameId} updated with bingoCardId: ${bingoCardId}`);
  } catch (error) {
    console.error("Error updating game with bingo card:", error);
    throw new Error("Failed to update game");
  }
}
