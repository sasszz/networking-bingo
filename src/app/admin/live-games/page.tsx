"use client";

import Link from "next/link";
import { Button } from "@/components";

export default function LiveGames() {
  return (
    <div className="flex flex-col gap-12 items-center justify-center h-screen">
      <h2>Live Games</h2>
      {[1, 2].map((gameNumber) => (
        <div
          key={gameNumber}
          className="flex flex-row gap-4 justify-center items-center"
        >
          <p>Live Game No {gameNumber}</p>
          <Link href={`/admin/live-games/leaderboard/${gameNumber}`}>
            <Button buttonText={"Leaderboard"} />
          </Link>
        </div>
      ))}
    </div>
  );
}
