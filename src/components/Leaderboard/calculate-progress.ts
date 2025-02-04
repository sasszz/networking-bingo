import { Game, Player } from "./game-data";
import { winningPatterns } from "./winning-patterns";

export const calculateProgress = (
  player: Player,
  winningType: Game["winningType"]
) => {
  const filledSet = new Set(
    player.filledCoordinates.map(({ coord }) => `${coord[0]},${coord[1]}`)
  );

  const requiredPatterns: [number, number][][] = winningPatterns[winningType];

  let minTilesNeeded = Infinity;
  let latestTime: string | null = null;

  for (const pattern of requiredPatterns) {
    const missingTiles = pattern.filter(
      ([x, y]) => !filledSet.has(`${x},${y}`)
    );

    if (missingTiles.length === 0) {
      latestTime =
        pattern
          .map(
            ([x, y]) =>
              player.filledCoordinates.find(
                ({ coord }) => coord[0] === x && coord[1] === y
              )?.time || ""
          )
          .filter(Boolean)
          .sort()
          .pop() || null;

      return { tilesNeeded: 0, completedAt: latestTime };
    }

    minTilesNeeded = Math.min(minTilesNeeded, missingTiles.length);
  }

  return { tilesNeeded: minTilesNeeded, completedAt: null };
};
