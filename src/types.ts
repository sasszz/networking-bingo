export type BingoType = 'one-line' | 'two-line' | 'three-line' | 'window' | 'blackout';
export type GameDetails = {
  gameType: BingoType;
  startTime: string;
  endTime: string;
  duration: string;
};

export type BingoItem = string;
export type BingoItems = BingoItem[];
