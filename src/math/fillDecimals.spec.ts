import { describe, expect, it } from "vitest";
import { fillDecimals } from "./fillDecimals";

describe("fillDecimals", () => {
  it("fills decimal places correctly", () => {
    expect(fillDecimals(32.1)).toBe("32");
    expect(fillDecimals(32.1, 3)).toBe("32.100");
    expect(fillDecimals(32, 1)).toBe("32.0");
  });

  it("handles zero or negative decimal places", () => {
    expect(fillDecimals(32.11, 0)).toBe("32");
    expect(fillDecimals(32.11, -2)).toBe("32");
  });

  it("throws error for non-integer decimals", () => {
    expect(() => fillDecimals(32.11, 2.5)).toThrow("The decimals parameter must be an integer.");
    expect(() => fillDecimals(32.11, NaN)).toThrow("The decimals parameter must be an integer.");
  });
});
