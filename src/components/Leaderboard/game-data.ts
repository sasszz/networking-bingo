export interface Player {
  name: string;
  filledCoordinates: { coord: [number, number]; time: string }[];
}

export interface Game {
  gameId: string;
  gameName: string;
  startTime: string;
  endTime: string;
  numberOfPlayers: number;
  winningType: "one-line" | "two-line" | "three-line" | "window" | "blackout";
  players: Player[];
}

const formatTime = (baseHour: number, offset: number) => {
  const totalMinutes = offset;
  const hours = baseHour + Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  return `2025-02-04T${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:00Z`;
};

export const games: Record<string, Game> = {
  "1": {
    gameId: "1",
    gameName: "Networking Bingo",
    startTime: "2025-02-03T21:00:00Z",
    endTime: "2025-02-03T24:00:00Z",
    numberOfPlayers: 6,
    winningType: "one-line" as
      | "one-line"
      | "two-line"
      | "three-line"
      | "window"
      | "blackout",
    players: [
      {
        name: "Alice",
        filledCoordinates: [
          { coord: [0, 0], time: "2025-02-03T21:15:12Z" },
          { coord: [0, 1], time: "2025-02-03T21:30:35Z" },
          { coord: [0, 2], time: "2025-02-03T21:45:44Z" },
          { coord: [0, 3], time: "2025-02-03T22:00:02Z" },
          { coord: [0, 4], time: "2025-02-03T22:15:35Z" },
          { coord: [2, 3], time: "2025-02-03T22:19:57Z" },
          { coord: [3, 1], time: "2025-02-03T22:18:57Z" },
          { coord: [4, 2], time: "2025-02-03T22:45:22Z" },
        ],
      },
      {
        name: "Bob",
        filledCoordinates: [
          { coord: [1, 1], time: "2025-02-03T22:30:56Z" },
          { coord: [2, 2], time: "2025-02-03T22:45:21Z" },
          { coord: [3, 3], time: "2025-02-03T23:00:15Z" },
          { coord: [4, 4], time: "2025-02-03T23:15:17Z" },
          { coord: [1, 3], time: "2025-02-03T21:50:49Z" },
          { coord: [3, 0], time: "2025-02-03T22:05:32Z" },
        ],
      },
      {
        name: "Charlie",
        filledCoordinates: [
          { coord: [2, 0], time: "2025-02-03T21:30:59Z" },
          { coord: [2, 1], time: "2025-02-03T22:45:09Z" },
          { coord: [2, 2], time: "2025-02-03T22:00:12Z" },
          { coord: [0, 2], time: "2025-02-03T21:55:33Z" },
          { coord: [1, 0], time: "2025-02-03T22:12:44Z" },
        ],
      },
      {
        name: "David",
        filledCoordinates: [
          { coord: [3, 0], time: "2025-02-03T21:10:23Z" },
          { coord: [3, 1], time: "2025-02-03T21:20:46Z" },
          { coord: [3, 2], time: "2025-02-03T21:30:02Z" },
          { coord: [3, 3], time: "2025-02-03T21:40:13Z" },
          { coord: [3, 4], time: "2025-02-03T21:50:33Z" },
          { coord: [4, 1], time: "2025-02-03T22:05:18Z" },
          { coord: [1, 4], time: "2025-02-03T22:15:49Z" },
        ],
      },
      {
        name: "Eve",
        filledCoordinates: [
          { coord: [4, 0], time: "2025-02-03T22:05:22Z" },
          { coord: [4, 1], time: "2025-02-03T22:20:55Z" },
          { coord: [4, 2], time: "2025-02-03T22:35:48Z" },
          { coord: [4, 3], time: "2025-02-03T22:50:29Z" },
          { coord: [4, 4], time: "2025-02-03T23:00:19Z" },
          { coord: [2, 4], time: "2025-02-03T22:11:57Z" },
          { coord: [1, 2], time: "2025-02-03T21:55:43Z" },
        ],
      },
      {
        name: "Frank",
        filledCoordinates: [
          { coord: [1, 0], time: "2025-02-03T21:25:29Z" },
          { coord: [1, 1], time: "2025-02-03T21:40:27Z" },
          { coord: [1, 2], time: "2025-02-03T21:55:35Z" },
          { coord: [1, 3], time: "2025-02-03T22:10:57Z" },
          { coord: [1, 4], time: "2025-02-03T22:25:12Z" },
          { coord: [0, 3], time: "2025-02-03T22:30:22Z" },
          { coord: [3, 4], time: "2025-02-03T22:45:54Z" },
        ],
      },
    ],
  },
  "2": {
    gameId: "2",
    gameName: "Ultimate Networking Bingo",
    startTime: "2025-02-04T18:00:00Z",
    endTime: "2025-02-04T21:00:00Z",
    numberOfPlayers: 9,
    winningType: "blackout",
    players: [
      {
        name: "Alice",
        filledCoordinates: [
          { coord: [0, 0], time: formatTime(18, 10) },
          { coord: [1, 2], time: formatTime(18, 12) },
          { coord: [2, 3], time: formatTime(18, 14) },
          { coord: [4, 4], time: formatTime(18, 20) },
          { coord: [3, 1], time: formatTime(18, 25) },
          { coord: [2, 4], time: formatTime(18, 35) },
        ],
      },
      {
        name: "Bob",
        filledCoordinates: [
          { coord: [0, 1], time: formatTime(18, 15) },
          { coord: [1, 1], time: formatTime(18, 18) },
          { coord: [2, 2], time: formatTime(18, 22) },
          { coord: [3, 3], time: formatTime(18, 30) },
          { coord: [4, 2], time: formatTime(18, 40) },
          { coord: [1, 4], time: formatTime(18, 50) },
          { coord: [0, 3], time: formatTime(18, 55) },
        ],
      },
      {
        name: "Charlie",
        filledCoordinates: [
          { coord: [3, 0], time: formatTime(18, 10) },
          { coord: [3, 1], time: formatTime(18, 12) },
          { coord: [3, 2], time: formatTime(18, 14) },
          { coord: [3, 3], time: formatTime(18, 16) },
          { coord: [3, 4], time: formatTime(18, 18) },
          { coord: [4, 1], time: formatTime(18, 22) },
          { coord: [2, 4], time: formatTime(18, 27) },
        ],
      },
      {
        name: "David",
        filledCoordinates: [
          { coord: [1, 0], time: formatTime(18, 13) },
          { coord: [2, 1], time: formatTime(18, 16) },
          { coord: [3, 2], time: formatTime(18, 19) },
          { coord: [4, 3], time: formatTime(18, 23) },
          { coord: [0, 4], time: formatTime(18, 30) },
        ],
      },
      {
        name: "Eve",
        filledCoordinates: [
          { coord: [0, 0], time: formatTime(18, 10) },
          { coord: [1, 1], time: formatTime(18, 12) },
          { coord: [2, 2], time: formatTime(18, 14) },
          { coord: [3, 3], time: formatTime(18, 16) },
          { coord: [4, 4], time: formatTime(18, 18) },
          { coord: [0, 4], time: formatTime(18, 20) },
          { coord: [4, 0], time: formatTime(18, 22) },
          { coord: [2, 3], time: formatTime(18, 24) },
          { coord: [3, 2], time: formatTime(18, 26) },
        ],
      },
      {
        name: "Frank",
        filledCoordinates: [
          { coord: [4, 1], time: formatTime(18, 15) },
          { coord: [4, 2], time: formatTime(18, 18) },
          { coord: [4, 3], time: formatTime(18, 21) },
          { coord: [1, 3], time: formatTime(18, 25) },
          { coord: [2, 4], time: formatTime(18, 30) },
          { coord: [0, 2], time: formatTime(18, 35) },
        ],
      },
      {
        name: "Grace",
        filledCoordinates: [
          { coord: [1, 0], time: formatTime(18, 13) },
          { coord: [1, 2], time: formatTime(18, 16) },
          { coord: [1, 3], time: formatTime(18, 19) },
          { coord: [2, 1], time: formatTime(18, 23) },
          { coord: [3, 4], time: formatTime(18, 27) },
          { coord: [4, 3], time: formatTime(18, 31) },
          { coord: [2, 2], time: formatTime(18, 37) },
        ],
      },
      {
        name: "Hank",
        filledCoordinates: [
          { coord: [0, 1], time: formatTime(18, 12) },
          { coord: [1, 4], time: formatTime(18, 14) },
          { coord: [2, 3], time: formatTime(18, 18) },
          { coord: [3, 0], time: formatTime(18, 22) },
          { coord: [4, 2], time: formatTime(18, 28) },
        ],
      },
      {
        name: "Ivy",
        filledCoordinates: [
          { coord: [3, 0], time: formatTime(18, 11) },
          { coord: [2, 1], time: formatTime(18, 15) },
          { coord: [4, 2], time: formatTime(18, 19) },
          { coord: [2, 3], time: formatTime(18, 23) },
          { coord: [0, 2], time: formatTime(18, 27) },
        ],
      },
    ],
  },
};
