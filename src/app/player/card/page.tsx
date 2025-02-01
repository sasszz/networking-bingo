"use client";

import { BingoCard } from "@/components";

export default function Player() {
  const bingoItems = [
    "Web3 developer",
    "Codes in Typescript",
    "Has given a tech talk",
    "Attended a hackathon",
    "Coding Bootcamp graduate",
    "Ran a marathon",
    "Works in Customer Support",
    "Met a PM",
    "Is DevOps",
    "Uses a mechanical keyboard",
    "Prefers dark mode",
    "Works remotely",
    "Works at a startup",
    "Is a recruiter",
    "Is Wearing a blazer",
    "Is wearing sneakers",
    "Is wearing a tie",
    "Is drinking water",
    "Is drinking a beer",
    "Owns a dog",
    "Owns a cat",
    "Walks or bikes to work",
    "Commutes 30+ min",
    "Takes the bus to work"
  ]
  
  return (
    <div className="flex items-start justify-center h-screen">
      <div className="flex flex-col gap-24 text-center pt-12">
        <h2>Networking Bingo</h2>
        <BingoCard items={bingoItems} />
      </div>
    </div>
  );
}
