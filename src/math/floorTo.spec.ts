import { describe, expect, it } from "vitest";
import { floorTo } from "./floorTo";

describe("floorTo", () => {
  it("floor to integer by default", () => {
    expect(floorTo(3.14159)).toBe(3);
    expect(floorTo(3.5)).toBe(3);
    expect(floorTo(-3.14159)).toBe(-4);
  });

  it("floor to specified decimal places", () => {
    expect(floorTo(3.14159, 2)).toBe(3.14);
    expect(floorTo(3.14159, 4)).toBe(3.1415);
    expect(floorTo(3.14159, 1)).toBe(3.1);
  });

  it("handles negative decimal places", () => {
    expect(floorTo(3149.19, -2)).toBe(3100);
    expect(floorTo(3149.19, -1)).toBe(3140);
    expect(floorTo(3149.19, -3)).toBe(3000);
  });

  it("throws error for non-integer decimals", () => {
    expect(() => floorTo(3.14159, 2.5)).toThrow("The decimals parameter must be an integer.");
    expect(() => floorTo(3.14159, NaN)).toThrow("The decimals parameter must be an integer.");
  });
});
