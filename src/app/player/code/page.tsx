"use client";

import { GameCode } from "@/components";

export default function Card() {
  return (
    <div className="flex items-start justify-center h-screen">
      <div className="flex flex-col gap-24 text-center pt-12">
        <h2>Networking Bingo</h2>
        <p>Test Code: ABCDEF</p>
        <GameCode />
      </div>
    </div>
  );
}
