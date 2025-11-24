import { describe, expect, it } from "vitest";
import { isNull } from "./isNull";

describe("isNull", () => {
  it("should return true for null", () => {
    expect(isNull(null)).toBe(true);
  });

  it("should return false for other values", () => {
    expect(isNull(0)).toBe(false);
    expect(isNull("")).toBe(false);
    expect(isNull(false)).toBe(false);
    expect(isNull([])).toBe(false);
    expect(isNull(undefined)).toBe(false);
  });

  it("should filter out null and undefined values from an array", () => {
    const arr = [null, undefined, 42, "hello", {}];

    expect(arr.filter(isNull)).toEqual([null]);
  });
});
