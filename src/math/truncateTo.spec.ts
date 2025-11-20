import { describe, expect, it } from "vitest";
import { truncateTo } from "./truncateTo";

describe("truncateTo", () => {
  it("should truncate to integer by default", () => {
    expect(truncateTo(3.14159)).toBe(3);
    expect(truncateTo(-3.14159)).toBe(-3);
  });

  it("should truncate to specified decimal places", () => {
    expect(truncateTo(3.14159, 2)).toBe(3.14);
    expect(truncateTo(3.14159, 4)).toBe(3.1415);
    expect(truncateTo(-3.14159, 1)).toBe(-3.1);
  });

  it("should handle negative decimal places", () => {
    expect(truncateTo(3141.59, -2)).toBe(3100);
    expect(truncateTo(3141.59, -1)).toBe(3140);
    expect(truncateTo(3141.59, -3)).toBe(3000);
  });

  it("should throw error for non-integer decimals", () => {
    expect(() => truncateTo(3.14159, 2.5)).toThrow("The decimals parameter must be an integer.");
    expect(() => truncateTo(3.14159, NaN)).toThrow("The decimals parameter must be an integer.");
  });
});
