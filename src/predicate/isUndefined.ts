/**
 * Checks if a value is undefined.
 * @param value The value to check.
 * @returns True if the value is undefined, otherwise false.
 */
export function isUndefined(value: unknown): value is undefined {
  return value === undefined;
}
