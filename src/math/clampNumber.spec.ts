import { describe, expect, it } from "vitest";
import { clampNumber } from "./clampNumber";

describe("clampNumber", () => {
  it("clamps a number", () => {
    expect(clampNumber(10, 5)).toBe(5);
    expect(clampNumber(3, 5)).toBe(3);
  });

  it("clamps a number to be within the specified range", () => {
    expect(clampNumber(10, 5, 8)).toBe(8);
    expect(clampNumber(3, 5, 8)).toBe(5);
    expect(clampNumber(6, 5, 8)).toBe(6);
  });

  it("throws error for non-number", () => {
    expect(clampNumber(NaN, 2)).toBe(NaN);
    expect(clampNumber(10, NaN, 4)).toBe(NaN);
  });
});
