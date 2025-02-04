"use client";

import { useParams } from "next/navigation";
import { Leaderboard } from "@/components/Leaderboard";
import { games } from "@/components/Leaderboard/game-data";

export default function LeaderboardPage() {
  const { gameId } = useParams();
  const selectedGame = games[gameId as string] || null;

  if (!selectedGame) return <div>Game not found</div>;

  return <Leaderboard gameData={selectedGame} />;
}
