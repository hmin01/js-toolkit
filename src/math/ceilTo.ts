/**
 * Ceils a number to a specified number of decimal places.
 * @param value The number to ceil.
 * @param decimals The number of decimal places to ceil to. Non-negative integer. Defaults to 0.
 * @returns The ceiled number.
 *
 * @example
 * ```ts
 * ceilTo(3.14159, 2); // returns 3.15
 * ```
 */
export function ceilTo(value: number, decimals = 0): number {
  if (!Number.isInteger(decimals)) {
    throw new TypeError("The decimals parameter must be an integer.");
  }

  const factor = Math.pow(10, decimals);
  return Math.ceil(value * factor) / factor;
}
