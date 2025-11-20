import { describe, expect, it } from "vitest";
import { inRange } from "./inRange";

describe("inRange", () => {
  it("maximum only range", () => {
    expect(inRange(5, 10)).toBe(true);
    expect(inRange(10, 10)).toBe(false);
    expect(inRange(11, 10)).toBe(false);
  });

  it("maximum only range with inclusion/exclusion option", () => {
    expect(inRange(10, 10, "include")).toBe(true);
    expect(inRange(10, 10, "upperOnly")).toBe(true);
    expect(inRange(10, 10, "lowerOnly")).toBe(false);
    expect(inRange(10, 10, "exclude")).toBe(false);
  });

  it("range with minimum and maximum", () => {
    expect(inRange(5, 2, 10)).toBe(true);
    expect(inRange(10, 2, 10)).toBe(false);
    expect(inRange(15, 2, 10)).toBe(false);
    expect(inRange(2, 2, 10)).toBe(false);
  });

  it("range with minimum and maximum with inclusion/exclusion option", () => {
    expect(inRange(10, 2, 10, "include")).toBe(true);
    expect(inRange(10, 5, 10, "upperOnly")).toBe(true);
    expect(inRange(2, 2, 10, "lowerOnly")).toBe(true);
    expect(inRange(10, 2, 10, "exclude")).toBe(false);
  });

  it("handles negative numbers", () => {
    expect(inRange(-5, -10, 0)).toBe(true);
    expect(inRange(-10, -10, 0)).toBe(false);
    expect(inRange(-10, -10, 0, "include")).toBe(true);
    expect(inRange(-15, -10, 0)).toBe(false);
  });
  it("throws error when minimum is greater than maximum", () => {
    expect(() => inRange(5, 10, 2)).toThrow("The minimum value cannot be greater than the maximum value.");
  });
});
