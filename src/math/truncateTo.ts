/**
 * Truncates a number to a specified number of decimal places without rounding.
 * @param value The number to truncate.
 * @param decimals The number of decimal places to truncate to. Non-negative integer. Defaults to 0.
 * @returns The truncated number.
 *
 * @example
 * ```ts
 * truncateTo(3.14159, 2);  // returns 3.14
 * truncateTo(-3.14159, 2); // returns -3.14
 * ```
 */
export function truncateTo(value: number, decimals = 0): number {
  if (!Number.isInteger(decimals)) {
    throw new TypeError("The decimals parameter must be an integer.");
  }

  const factor = Math.pow(10, decimals);
  return Math.trunc(value * factor) / factor;
}
