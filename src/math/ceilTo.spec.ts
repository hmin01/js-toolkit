import { describe, expect, test } from "vitest";
import { ceilTo } from "./ceilTo";

describe("ceilTo", () => {
  test("ceil to integer by default", () => {
    expect(ceilTo(3.14159)).toBe(4);
    expect(ceilTo(3.5)).toBe(4);
    expect(ceilTo(-3.14159)).toBe(-3);
  });
  test("ceil to specified decimal places", () => {
    expect(ceilTo(3.14159, 2)).toBe(3.15);
    expect(ceilTo(3.14159, 4)).toBe(3.1416);
    expect(ceilTo(3.14159, 1)).toBe(3.2);
  });
  test("handles negative decimal places", () => {
    expect(ceilTo(3149.19, -2)).toBe(3200);
    expect(ceilTo(3149.19, -1)).toBe(3150);
    expect(ceilTo(3149.19, -3)).toBe(4000);
  });
  test("throws error for non-integer decimals", () => {
    expect(() => ceilTo(3.14159, 2.5)).toThrow("The decimals parameter must be an integer.");
    expect(() => ceilTo(3.14159, NaN)).toThrow("The decimals parameter must be an integer.");
  });
});
