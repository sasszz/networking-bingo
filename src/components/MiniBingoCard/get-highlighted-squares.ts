export const getHighlightedSquares = (
  type?: "one-line" | "two-line" | "three-line" | "window" | "blackout",
  filledCoordinates?: [number, number][]
): boolean[] => {
  const totalSquares = 25;
  const gridSize = 5;
  const highlightedSquares = new Array(totalSquares).fill(false);

  // Always fill the center square (2,2) -> index 12
  highlightedSquares[12] = true;

  if (filledCoordinates) {
    filledCoordinates.forEach(([row, col]) => {
      const index = row * gridSize + col;
      highlightedSquares[index] = true;
    });
  } else if (type) {
    switch (type) {
      case "one-line":
        [0, 6, 12, 18, 24].forEach((i) => (highlightedSquares[i] = true));
        break;
      case "two-line":
        highlightedSquares.fill(true, 10, 15);
        [0, 6, 12, 18, 24].forEach((i) => (highlightedSquares[i] = true));
        break;
      case "three-line":
        highlightedSquares.fill(true, 10, 15);
        [4, 9, 14, 19, 24].forEach((i) => (highlightedSquares[i] = true));
        [0, 6, 12, 18, 24].forEach((i) => (highlightedSquares[i] = true));
        break;
      case "window":
        highlightedSquares.fill(true, 0, 5);
        highlightedSquares.fill(true, 20, 25);
        [0, 5, 10, 15, 20].forEach((i) => (highlightedSquares[i] = true));
        [4, 9, 14, 19, 24].forEach((i) => (highlightedSquares[i] = true));
        break;
      case "blackout":
        highlightedSquares.fill(true);
        break;
    }
  }

  return highlightedSquares;
};
