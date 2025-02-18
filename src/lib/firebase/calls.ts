import { collection, addDoc, Timestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "@/lib/firebase/config";
import { Game } from "@/lib/types/database";
import { v4 as uuidv4 } from "uuid";

function generateGameCode(): string {
  return Array.from({ length: 6 }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26))
  ).join("");
}

export async function addBingoGame({
  gameName,
  startTime,
  duration,
  players = [],
  winningType,
  bingoCardId,
}: Omit<Game, "status" | "createdAt" | "gameId" | "gameCode" | "adminId">) {
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

    const gameId = uuidv4();
    const gameCode = generateGameCode();

    const docRef = await addDoc(collection(db, "bingoGames"), {
      gameId,
      adminId, // Set from authenticated user
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

    console.log(docRef.id);
    
    return { gameId, gameCode };
  } catch (error) {
    console.error("Error adding bingo game: ", error);
    throw new Error("Failed to create bingo game");
  }
}
