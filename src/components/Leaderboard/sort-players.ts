import { Player } from "./game-data";

export interface PlayerWithProgress extends Player {
  tilesNeeded: number;
  completedAt: string | null;
}

export const sortPlayers = (players: PlayerWithProgress[]) => {
  return players.sort((a, b) => {
    if (a.completedAt && b.completedAt) {
      return new Date(a.completedAt).getTime() - new Date(b.completedAt).getTime();
    }
    if (a.completedAt) return -1;
    if (b.completedAt) return 1;
    return a.tilesNeeded - b.tilesNeeded;
  });
};
