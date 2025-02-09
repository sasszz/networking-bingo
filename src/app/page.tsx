"use client";

import Link from "next/link";

import { Button } from "@/components";

export default function Home() {
  return (
    <div className="flex flex-col gap-12 items-center justify-center h-screen">
      <h2>Networking Bingo</h2>
      <div className="flex flex-row gap-4">
        <Link href="/admin">
          <Button buttonText={"Admin"} />
        </Link>
        <Link href="/player/code">
          <Button buttonText={"Player"} />
        </Link>
      </div>
    </div>
  );
}
