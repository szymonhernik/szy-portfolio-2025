export const decimalToRatio = (decimal: number): string => {
  // Convert to fraction with tolerance of 0.001
  const tolerance = 0.001;
  let x = 1;
  let y = 1;

  while (Math.abs(decimal - x / y) > tolerance && y < 100) {
    if (x / y < decimal) {
      x++;
    } else {
      y++;
    }
  }

  return `${x} / ${y}`;
};
