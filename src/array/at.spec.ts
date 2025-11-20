import { describe, expect, it } from "vitest";
import { at } from "./at";

describe("at", () => {
  const invalidIndexErrorMessage = "Index must be an integer";

  const arr = ["a", "b", "c", "d", "e"];

  it("should return the element at the given indices", () => {
    expect(at(arr, [0, 2, 1])).toEqual(["a", "c", "b"]);
    expect(at(arr, [1, 3])).toEqual(["b", "d"]);
  });

  it("should support negative integer indices", () => {
    expect(at(arr, [-1, -3])).toEqual(["e", "c"]);
    expect(at(arr, [0, -2])).toEqual(["a", "d"]);
  });

  it("should return undefined for out-of-bounds indices", () => {
    expect(at(arr, [5, 1, 10])).toEqual([undefined, "b", undefined]);
    expect(at(arr, [-6, -1, 6])).toEqual([undefined, "e", undefined]);
  });

  it("should throw type error for non-integer indices", () => {
    expect(() => at(arr, [1.5, 2])).toThrow(invalidIndexErrorMessage);
    expect(() => at(arr, [0, "2" as any])).toThrow(invalidIndexErrorMessage);
    expect(() => at(arr, [Infinity])).toThrow(invalidIndexErrorMessage);
    expect(() => at(arr, [NaN])).toThrow(invalidIndexErrorMessage);
  });
});
