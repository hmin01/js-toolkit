/**
 * Returns an array of elements corresponding to the given indices.
 * @param array The source array from which to retrieve elements.
 * @param indices An array of indices specifying which elements to retrieve. Only integer values are allowed.
 * @returns An array of elements from the source array at the specified indices.
 *
 * @example
 * ```ts
 * const arr = ['a', 'b', 'c', 'd', 'e'];
 * const result = at(arr, [0, 2, -1]);    // Output: ['a', 'c', 'e']
 * ```
 */
export function at<T>(array: T[], indices: number[]): T[] {
  const result = new Array<T>(indices.length);
  const len = result.length;

  for (let i = 0; i < len; i++) {
    if (!Number.isInteger(indices[i])) {
      throw new TypeError("Index must be an integer");
    }

    const index = indices[i] < 0 ? array.length + indices[i] : indices[i];
    result[i] = array[index];
  }
  return result;
}
