import { winningPatterns } from "./winning-patterns";

interface Player {
  name: string;
  filledCoordinates: { coord: [number, number]; time: string }[];
}

interface Game {
  winningType: "one-line" | "two-line" | "three-line" | "window" | "blackout";
  players: Player[];
}

export const getLeaderboard = (game: Game) => {
  const winningSets = winningPatterns[game.winningType];

  return game.players
    .map((player) => {
      const playerCoords = new Set(
        player.filledCoordinates.map(({ coord }) => coord.join(","))
      );

      let fastestCompletionTime: string | undefined;
      let bestProgress = 0;

      for (const pattern of winningSets) {
        const matchedCount = [...pattern].filter((coord) =>
          playerCoords.has(coord.join(","))
        ).length;
        bestProgress = Math.max(bestProgress, matchedCount);

        if (matchedCount === pattern.length) {
          const latestTime = player.filledCoordinates
            .filter(({ coord }) =>
              pattern.some((p) => p.join(",") === coord.join(","))
            )
            .map(({ time }) => time)
            .sort()
            .at(-1);

          if (
            !fastestCompletionTime ||
            (latestTime && latestTime < fastestCompletionTime)
          ) {
            fastestCompletionTime = latestTime;
          }
        }
      }

      return {
        name: player.name,
        filledCoordinates: player.filledCoordinates,
        progress: bestProgress,
        completedAt: fastestCompletionTime,
      };
    })
    .sort((a, b) => {
      if (a.completedAt && b.completedAt)
        return a.completedAt.localeCompare(b.completedAt);
      if (a.completedAt) return -1;
      if (b.completedAt) return 1;
      return b.progress - a.progress;
    });
};
