/**
 * Checks if a value is null.
 * @param value The value to check.
 * @returns True if the value is null, otherwise false.
 *
 * @example
 * ```ts
 * isNull(null);      // true
 * isNull(undefined); // false
 * isNull(0);         // false
 * isNull('');        // false
 * ```
 */
export function isNull(value: unknown): value is null {
  return value === null;
}
