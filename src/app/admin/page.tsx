"use client";

import Link from "next/link";

import { Button } from "@/components";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 items-center justify-center h-screen">
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
    </div>
  );
}
