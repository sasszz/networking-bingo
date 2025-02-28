"use client";

import { useState, useEffect } from "react";
import Confetti from "react-confetti-boom";
import { useRouter } from "next/navigation";
import { Button } from "@/components";

export default function SuccessPage() {
  const router = useRouter();
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6">
      {showConfetti && (
        <Confetti
          mode="boom"
          particleCount={500}
          spreadDeg={100}
          shapeSize={20}
          y={0}
          colors={["#FFFFFF", "#000000", "#A9A9A9", "#808080"]}
        />
      )}

      <h1>Game Created Successfully!</h1>
      <p>Your bingo game is now ready to play.</p>

      <Button
        buttonText={"Go to Dashboard"}
        onClick={() => router.push("/admin")}
      />
    </div>
  );
}
