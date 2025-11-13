import { describe, expect, it, vi } from "vitest";
import { debounce } from "./debounce";
// adjust the import path as necessary
import { delay } from "../promise";

describe("debounce", () => {
  it("debounces a function call", async () => {
    const debounceMs = 50;
    const func = vi.fn();

    const debounced = debounce(func, debounceMs);

    debounced();
    debounced();
    debounced();
    await delay(debounceMs * 2);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it("should delay the function call by the specified wait time", async () => {
    const debounceMs = 100;
    const func = vi.fn();

    const debounced = debounce(func, debounceMs);

    debounced();
    await delay(debounceMs / 2);

    expect(func).not.toHaveBeenCalled();

    await delay(debounceMs / 2 + 1);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it("reset debounce time on each call", async () => {
    const debounceMs = 50;
    const func = vi.fn();

    const debounced = debounce(func, debounceMs);

    debounced();
    await delay(debounceMs / 2);
    debounced();
    await delay(debounceMs / 2);
    debounced();

    expect(func).not.toHaveBeenCalled();

    await delay(debounceMs + 1);

    expect(func).toHaveBeenCalledTimes(1);
  });

  it("debounced function is called after the wait time", async () => {
    const debounceMs = 50;
    const func = vi.fn();

    const debounced = debounce(func, debounceMs);

    debounced();
    await delay(debounceMs + 1);
    debounced();
    await delay(debounceMs + 1);

    expect(func).toHaveBeenCalledTimes(2);
  });

  it("cancels the debounced function call", async () => {
    const debounceMs = 50;
    const func = vi.fn();

    const debounced = debounce(func, debounceMs);

    debounced();
    debounced.cancel();
    await delay(debounceMs + 1);

    expect(func).not.toHaveBeenCalled();
  });

  it("cancels the debounced function call when signal is aborted", async () => {
    const debounceMs = 50;
    const func = vi.fn();

    const controller = new AbortController();
    const signal = controller.signal;
    controller.abort();

    const debounced = debounce(func, debounceMs, { signal });

    debounced();
    await delay(debounceMs);

    expect(func).not.toHaveBeenCalled();
  });

  it("flushes the debounced function call", async () => {
    const debounceMs = 50;
    const func = vi.fn();

    const debounced = debounce(func, debounceMs);

    debounced();
    debounced.flush();

    expect(func).toHaveBeenCalledTimes(1);
  });

  it("edges option works correctly", async () => {
    const debounceMs = 50;
    const func = vi.fn();

    const debounced = debounce(func, debounceMs, { edges: ["leading", "trailing"] });

    debounced();
    debounced();
    await delay(debounceMs / 2);

    expect(func).toHaveBeenCalledTimes(3);

    await delay(debounceMs / 2 + 1);

    expect(func).toHaveBeenCalledTimes(4);
  });
});
