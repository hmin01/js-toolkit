/**
 * Fills the decimal part of a number with trailing zeros up to the specified number of decimal places.
 * @param value The number to fill decimal places for.
 * @param decimals The number of decimal places to fill. Defaults to 0.
 * @returns The number as a string with filled decimal places.
 *
 * @example
 * ```ts
 * fillDecimals(32.1);   // returns "32"
 * fillDecimals(32.1, 3); // returns "32.100"
 * ```
 */
export function fillDecimals(value: number, decimals = 0): string {
  if (!Number.isInteger(decimals)) {
    throw new Error("The decimals parameter must be an integer.");
  }

  const parts = value.toString().split(".");
  if (decimals <= 0) {
    return parts[0];
  } else {
    return `${parts[0]}.${(parts[1] ?? "").padEnd(decimals, "0")}`;
  }
}
