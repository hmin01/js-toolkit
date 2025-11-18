/**
 * Splits an array into chunks of specified size.
 * @param array The source array to be chunked.
 * @param size The size of each chunk. Must be a positive integer.
 * @returns An array of chunks, where each chunk is an array of elements.
 *
 * @example
 * ```ts
 * const arr = [1, 2, 3, 4, 5];
 * const result = chunk(arr, 2);    // Output: [[1, 2], [3, 4], [5]]
 * ```
 */
export function chunk<T>(array: T[], size: number): T[][] {
  if (!Number.isInteger(size) || size < 0) {
    throw new TypeError("Size must be an integer greater than zero.");
  }

  const chunkLength = size > 0 ? Math.ceil(array.length / size) : 0;
  const chunks = new Array<T[]>(chunkLength);

  for (let i = 0; i < chunkLength; i++) {
    const start = i * size;
    const end = start + size;
    chunks[i] = array.slice(start, end);
  }
  return chunks;
}
