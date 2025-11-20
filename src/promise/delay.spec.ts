import { describe, expect, it, vi } from "vitest";
import { delay } from "./delay";

/**
 * [References] es-toolkit/delay
 * @see https://github.com/toss/es-toolkit/blob/v1.41.0/src/promise/delay.spec.ts
 */
describe("delay", () => {
  const delayMs = 10;
  const delayLongMs = 100;

  it("pauses execution for the specified time", async () => {
    const start = Date.now();
    await delay(delayMs + 1);
    const end = Date.now();

    expect(end - start).toBeGreaterThanOrEqual(delayMs);
  });

  it("cancels the delay when the AbortSignal is triggered", async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    setTimeout(() => {
      controller.abort();
    }, 100);

    await expect(delay(delayLongMs, { signal })).rejects.toThrow("Delay aborted");
  });

  it("cancels the delay immediately if the AbortSignal is triggered", async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    const spy = vi.spyOn(globalThis, "setTimeout");

    const start = Date.now();
    const promise = delay(delayLongMs, { signal });
    controller.abort();

    await expect(promise).rejects.toThrow("Delay aborted");
    const end = Date.now();

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();

    expect(end - start).toBeLessThanOrEqual(delayLongMs);
  });

  it("cancels the delay immediately if the AbortSignal is already aborted", async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    controller.abort();

    const start = Date.now();
    const promise = delay(delayLongMs, { signal });

    await expect(promise).rejects.toThrow("Delay aborted");
    const end = Date.now();

    expect(end - start).toBeLessThanOrEqual(delayLongMs);
  });

  it("should clean up abort event listener after delay completes", async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    const spy = vi.spyOn(signal, "removeEventListener");

    await delay(delayMs, { signal });

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
