import { describe, expect, it } from "vitest";
import { isUndefined } from "./isUndefined";

describe("isUndefined", () => {
  it("should return true for undefined", () => {
    expect(isUndefined(undefined)).toBe(true);
  });

  it("should return false for other values", () => {
    expect(isUndefined(0)).toBe(false);
    expect(isUndefined("")).toBe(false);
    expect(isUndefined(false)).toBe(false);
    expect(isUndefined([])).toBe(false);
    expect(isUndefined(null)).toBe(false);
  });

  it("should filter out null and undefined values from an array", () => {
    const arr = [null, undefined, 42, "hello", {}];

    expect(arr.filter(isUndefined)).toEqual([undefined]);
  });
});
