const allLines: [number, number][][] = [
  // Horizontal lines
  ...Array.from({ length: 5 }, (_, i) => Array.from({ length: 5 }, (_, j) => [i, j] as [number, number])),
  // Vertical lines
  ...Array.from({ length: 5 }, (_, j) => Array.from({ length: 5 }, (_, i) => [i, j] as [number, number])),
  // Diagonal lines
  [[0, 0], [1, 1], [2, 2], [3, 3], [4, 4]],
  [[0, 4], [1, 3], [2, 2], [3, 1], [4, 0]],
];

const blackoutPattern: [number, number][][] = [
  Array.from({ length: 5 }, (_, x) =>
    Array.from({ length: 5 }, (_, y) => [x, y] as [number, number])
  ).flat(),
];

const windowPattern: [number, number][][] = [
  [
    [0, 0], [0, 1], [0, 2], [0, 3], [0, 4],
    [4, 0], [4, 1], [4, 2], [4, 3], [4, 4],
    [1, 0], [2, 0], [3, 0],
    [1, 4], [2, 4], [3, 4],
  ],
];

const getCombinations = (numLines: number): [number, number][][] => 
  allLines.flatMap((line, i) =>
    allLines.slice(i + 1).flatMap((line2, j) =>
      numLines === 2
        ? [[[...line], [...line2]]]
        : allLines.slice(i + j + 2).map(line3 => [[...line], [...line2], [...line3]])
    )
  ).flat();

export const winningPatterns: Record<
  "one-line" | "two-line" | "three-line" | "window" | "blackout",
  [number, number][][]
> = {
  "one-line": allLines,
  "two-line": getCombinations(2),
  "three-line": getCombinations(3),
  "window": windowPattern,
  "blackout": blackoutPattern,
};
