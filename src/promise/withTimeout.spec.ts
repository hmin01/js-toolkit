import { describe, expect, it } from "vitest";
import { delay } from "./delay";
import { withTimeout } from "./withTimeout";

describe("withTimeout", () => {
  it("should resolve if the function resolves before the timeout", async () => {
    const result = await withTimeout(async () => {
      await delay(50);
      return "success";
    }, 100);

    expect(result).toBe("success");
  });

  it("should reject with timeout error if the function takes too long", async () => {
    expect(
      withTimeout(async () => {
        await delay(100);
      }, 50)
    ).rejects.toThrow("Operation timed out");
  });
});
