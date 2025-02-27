import {
  collection,
  addDoc,
  Timestamp
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "@/lib/firebase/config";
import { Game } from "@/lib/types/database";

export async function addBingoGame({
  gameName,
  startTime,
  duration,
  gameCode,
  players = [],
  winningType,
  prompts,
}: Omit<Game, "status" | "createdAt" | "gameId" | "adminId"> & { prompts: string[] }) {
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

    const docRef = await addDoc(collection(db, "bingoGames"), {
      adminId,
      gameName,
      gameCode,
      status,
      startTime: Timestamp.fromDate(start),
      endTime: Timestamp.fromDate(end),
      winningType,
      players,
      prompts,
      createdAt: Timestamp.now(),
    });

    console.log("Game created with ID:", docRef.id);

    return { gameId: docRef.id, gameCode };
  } catch (error) {
    console.error("Error adding bingo game:", error);
    throw new Error("Failed to create bingo game");
  }
}
