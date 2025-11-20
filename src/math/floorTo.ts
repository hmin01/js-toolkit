/**
 * Floors a number to a specified number of decimal places.
 * @param value The number to floor.
 * @param decimals The number of decimal places to floor to. Non-negative integer. Defaults to 0.
 * @returns The floored number.
 *
 * @example
 * ```ts
 * floorTo(3.14159); // returns 3
 * floorTo(3.14159, 2); // returns 3.14
 * ```
 */
export function floorTo(value: number, decimals = 0): number {
  if (!Number.isInteger(decimals)) {
    throw new TypeError("The decimals parameter must be an integer.");
  }

  const factor = Math.pow(10, decimals);
  return Math.floor(value * factor) / factor;
}
