import { describe, expect, it, vi } from "vitest";
import { delay } from "../promise";
import { throttle } from "./throttle";

/**
 * [References] es-toolkit/throttle
 * @see https://github.com/toss/es-toolkit/blob/v1.41.0/src/function/throttle.spec.ts
 */
describe("throttle", () => {
  const throttleMs = 100;

  it("The throttled function calls correctly", async () => {
    const func = vi.fn();
    const throttled = throttle(func, throttleMs);

    throttled();
    throttled();
    throttled();

    expect(func).toHaveBeenCalledTimes(1);

    await delay(throttleMs + 1);

    // The trailing call
    expect(func).toHaveBeenCalledTimes(2);
  });

  it("The throttle function should execute immediately if not called within the wait time", async () => {
    const func = vi.fn();
    const throttled = throttle(func, throttleMs);

    throttled(); // should be executed
    expect(func).toHaveBeenCalledTimes(1);

    await delay(throttleMs / 2);
    expect(func).toHaveBeenCalledTimes(1);

    throttled(); // should be ignored
    expect(func).toHaveBeenCalledTimes(1);

    await delay(throttleMs / 2 + 1);
    expect(func).toHaveBeenCalledTimes(1);

    throttled(); // should be executed
    expect(func).toHaveBeenCalledTimes(2);

    await delay(throttleMs / 2 - 1);
    expect(func).toHaveBeenCalledTimes(2);

    throttled(); // should be ignored
    expect(func).toHaveBeenCalledTimes(2);

    await delay(throttleMs / 2 + 1);
    expect(func).toHaveBeenCalledTimes(2);

    throttled(); // should be executed
    expect(func).toHaveBeenCalledTimes(3);
  });

  it("The throttle function should call with correct arguments", async () => {
    const func = vi.fn();
    const throttled = throttle(func, throttleMs);

    throttled("hello");

    expect(func).toHaveBeenCalledTimes(1);
    expect(func).toHaveBeenCalledWith("hello");
  });

  it("The throttle function should not trigger a trailing call when invoked once", async () => {
    const func = vi.fn();
    const throttled = throttle(func, throttleMs);

    throttled();

    expect(func).toHaveBeenCalledTimes(1);

    await delay(throttleMs + 1);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it("The throttle function should be able to abort initial invocation", async () => {
    const controller = new AbortController();
    const signal = controller.signal;
    controller.abort();

    const func = vi.fn();
    const throttled = throttle(func, throttleMs, { signal });

    throttled();

    expect(func).toHaveBeenCalledTimes(0);

    await delay(throttleMs + 1);

    expect(func).toHaveBeenCalledTimes(0);
  });

  it("The throttle function should be cancelable using an AbortSignal", async () => {
    const controller = new AbortController();
    const signal = controller.signal;

    const func = vi.fn();
    const throttled = throttle(func, throttleMs, { signal });

    throttled();
    throttled();

    expect(func).toHaveBeenCalledTimes(1);

    controller.abort();
    await delay(throttleMs + 1);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it("The throttle function should preserve 'this' context when called as a method", async () => {
    let captureMessage: string | undefined = undefined;

    const obj = {
      message: "Hello, World!",
      logWithThrottle: throttle(function (this: any) {
        captureMessage = this.message;
      }, throttleMs),
    };

    obj.logWithThrottle();

    expect(captureMessage).toBe("Hello, World!");

    captureMessage = undefined;
    obj.logWithThrottle();
    obj.logWithThrottle();
    await delay(throttleMs + 1);

    expect(captureMessage).toBe("Hello, World!");
  });
});
