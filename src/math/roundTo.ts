/**
 * Rounds a number to a specified number of decimal places.
 * @param value The number to round.
 * @param decimals The number of decimal places to round to. Non-negative integer. Defaults to 0.
 * @returns The rounded number.
 *
 * @example
 * ```ts
 * roundTo(3.14159, 2); // returns 3.14
 * ```
 */
export function roundTo(value: number, decimals = 0): number {
  if (!Number.isInteger(decimals)) {
    throw new TypeError("The decimals parameter must be an integer.");
  }

  const factor = Math.pow(10, decimals);
  return Math.round(value * factor) / factor;
}
