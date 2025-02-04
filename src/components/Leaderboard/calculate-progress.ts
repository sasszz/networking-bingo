import { winningPatterns } from "./winning-patterns";

export const calculateProgress = (player: Player, winningType: Game["winningType"]) => {
  const gridSize = 5;
  const filledSet = new Set(player.filledCoordinates.map(({ coord }) => `${coord[0]},${coord[1]}`));

  // Get the required winning patterns for the current game type
  const requiredPatterns = winningPatterns[winningType];

  for (const pattern of requiredPatterns) {
    const isWinning = pattern.every(([x, y]) => filledSet.has(`${x},${y}`));

    if (isWinning) {
      // Find the latest timestamp from the winning pattern
      const latestTime = pattern
        .map(([x, y]) => player.filledCoordinates.find(({ coord }) => coord[0] === x && coord[1] === y)?.time || "")
        .filter(Boolean)
        .sort()
        .pop();

      return { progress: 100, completedAt: latestTime };
    }
  }

  // Progress is based on how many spots they have filled
  return { progress: (filledSet.size / (gridSize * gridSize)) * 100, completedAt: null };
};
