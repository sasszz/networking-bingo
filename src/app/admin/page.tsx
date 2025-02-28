"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button, GameDisplayCard } from "@/components";
import { getUserBingoGames } from "@/lib/firebase/calls";
import { Game } from "@/lib/types/database";

export default function Home() {
  const [games, setGames] = useState<Game[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchGames() {
      try {
        const userGames = await getUserBingoGames();
        setGames(userGames);
      } catch (err) {
        setError("Failed to load games. Make sure you are logged in.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchGames();
  }, []);

  return (
    <div className="flex flex-col gap-12 items-center justify-start h-screen">
      <h2>Admin Page</h2>
      
      <div className="flex flex-col gap-4">
        <Link href="/admin/create-game">
          <Button buttonText={"Create New Game"} />
        </Link>
        <Link href="/admin">
          <Button buttonText={"View Past Games"} />
        </Link>
        <Link href="/admin/live-games">
          <Button buttonText={"View Live Games"} />
        </Link>
      </div>

      {/* Games List */}
      <div className="mt-8 w-full max-w-md text-center">
        <h3>Your Bingo Games</h3>
        <GameDisplayCard />
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : games.length > 0 ? (
          <ul className="list-disc text-left mx-auto">
            {games.map((game) => (
              <li key={game.gameId} className="mt-2">
                {game.gameName} - <strong>{game.status}</strong>
              </li>
            ))}
          </ul>
        ) : (
          <p>No games found.</p>
        )}
      </div>
    </div>
  );
}
