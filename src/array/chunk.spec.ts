import { describe, expect, it } from "vitest";
import { chunk } from "./chunk";

describe("array/chunk", () => {
  const invalidChunkSizeErrorMessage = "Size must be an integer greater than zero.";

  const arr = [1, 2, 3, 4, 5, 6, 7];

  it("should split array into chunks of specified size", () => {
    expect(chunk(arr, 2)).toEqual([[1, 2], [3, 4], [5, 6], [7]]);
    expect(chunk(arr, 3)).toEqual([[1, 2, 3], [4, 5, 6], [7]]);
    expect(chunk(arr, 1)).toEqual([[1], [2], [3], [4], [5], [6], [7]]);
  });

  it("should return the whole array as a single chunk if size is greater then array length", () => {
    expect(chunk(arr, 10)).toEqual([[1, 2, 3, 4, 5, 6, 7]]);
  });

  it("should return an empty array when input array is empty or size is zero", () => {
    expect(chunk([], 2)).toEqual([]);
    expect(chunk(arr, 0)).toEqual([]);
  });

  it("should throw error if size is not a positive integer", () => {
    expect(() => chunk(arr, -2)).toThrow(invalidChunkSizeErrorMessage);
    expect(() => chunk(arr, 2.5)).toThrow(invalidChunkSizeErrorMessage);
    expect(() => chunk(arr, NaN)).toThrow(invalidChunkSizeErrorMessage);
    expect(() => chunk(arr, Infinity)).toThrow(invalidChunkSizeErrorMessage);
    expect(() => chunk(arr, "2" as any)).toThrow(invalidChunkSizeErrorMessage);
  });
});
