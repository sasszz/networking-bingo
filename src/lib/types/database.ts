export type User = {
  userId: string;
  displayName: string;
  email: string;
  joinedAt: Date;
  createdAt: Date;
};

export type Game = {
  gameId: string;
  adminId: string; // Reference to User.userId
  gameName: string;
  gameCode: string;
  status: "scheduled" | "active" | "ended";
  startTime: Date;
  endTime: Date;
  duration: number;
  winningType: "one-line" | "two-line" | "three-line" | "window" | "blackout";
  bingoCardId: string; // Reference to BingoCard.bingoCardId
  players: string[]; // Array of User.userId references
  createdAt: Date;
};

export type BingoCard = {
  bingoCardId: string;
  prompts: string[];
  createdAt: Date;
};

export type BingoCardButton = {
  bingoCardButtonId: string;
  prompt: string;
  email: string;
  linkedInAddress: string;
  name: string;
  company: string;
  createdAt: Date;
};

export type PlayerCard = {
  playerCardId: string;
  userId: string; // Reference to User.userId
  gameId: string; // Reference to Game.gameId
  bingoCardId: string; // Reference to BingoCard.bingoCardId
  prompts: BingoCardButton[]; // List of BingoCardButton objects
  filledCoordinates: string[][];
  completedAt?: Date;
  createdAt: Date;
};
