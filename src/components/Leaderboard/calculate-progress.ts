import { Game, Player } from "./game-data";
import { winningPatterns } from "./winning-patterns";

export const calculateProgress = (player: Player, winningType: Game["winningType"]) => {
  const gridSize = 5;
  const filledSet = new Set(player.filledCoordinates.map(({ coord }) => `${coord[0]},${coord[1]}`));

  const requiredPatterns: [number, number][][] = winningPatterns[winningType].map(pattern =>
    Array.from(pattern).map(coordStr => {
      const [x, y] = coordStr.split(",").map(Number);
      return [x, y] as [number, number];
    })
  );

  for (const pattern of requiredPatterns) {
    const isWinning = pattern.every(([x, y]) => filledSet.has(`${x},${y}`));

    if (isWinning) {
      const latestTime = pattern
        .map(([x, y]) => player.filledCoordinates.find(({ coord }) => coord[0] === x && coord[1] === y)?.time || "")
        .filter(Boolean)
        .sort()
        .pop();

      return { progress: 100, completedAt: latestTime };
    }
  }

  return { progress: (filledSet.size / (gridSize * gridSize)) * 100, completedAt: null };
};
