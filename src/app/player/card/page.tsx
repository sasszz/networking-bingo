"use client";

import { BingoCard } from "@/components";

export default function Player() {
  const bingoItems = [
    "takes the bus to work",
    "commutes 30+ min",
    "walks or bikes to work",
    "cat person",
    "owns a dog",
    "drinking a beer",
    "drinking water",
    "wearing a tie",
    "wearing sneakers",
    "ubered",
    "recruiter",
    "works at a startup",
    "works remote",
    "prefers dark mode",
    "devops",
    "project manager",
    "cx rep",
    "ran a marathon",
    "bootcamp grad",
    "attended a hackathon",
    "gave a tech talk",
    "typescript dev",
    "web3 degen",
    "uses chatgpt",
  ];

  return (
    <div className="flex items-start justify-center h-screen">
      <div className="flex flex-col gap-24 lg:gap-4 text-center pt-4">
        <h2>Networking Bingo</h2>
        <BingoCard items={bingoItems} />
      </div>
    </div>
  );
}
