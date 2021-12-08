/**
 * Generates a random number between 0 and max (max not included)
 * @max the maximum value in the range of number generation (0 -> max)
 */
export const Random = (max: number): number => Math.floor(Math.random() * max);
