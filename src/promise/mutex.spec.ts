import { describe, expect, it, vi } from "vitest";
import { delay } from "./delay";
import { Mutex } from "./mutex";

describe("Mutex", () => {
  it("should acquire and release the mutex", async () => {
    const mutex = new Mutex();

    expect(mutex.isLocked()).toBe(false);

    await mutex.acquire();
    expect(mutex.isLocked()).toBe(true);

    mutex.release();
    expect(mutex.isLocked()).toBe(false);
  });

  it("should block concurrent functions", async () => {
    const spy = vi.fn();

    const mutex = new Mutex();

    await mutex.acquire();

    mutex.acquire().then(spy);
    await delay(10);

    expect(spy).not.toHaveBeenCalled();

    mutex.release();
    await delay(10);

    expect(spy).toHaveBeenCalled();
  });

  it("should handle multiple concurrent acquisitions", async () => {
    const order: number[] = [];
    const mutex = new Mutex();

    const task = async (id: number) => {
      await mutex.acquire();
      order.push(id);
      await delay(10);
      mutex.release();
    };

    task(1);
    task(2);
    task(3);

    await delay(50);

    expect(order).toEqual([1, 2, 3]);
  });
});
