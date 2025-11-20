import { describe, it, expect } from "vitest";
import { Semaphore } from "./semaphore";
import { delay } from "./delay";

describe("Semaphore", () => {
  it("should acquire and release permits correctly", async () => {
    const semaphore = new Semaphore(1);

    expect(semaphore.available()).toBe(1);

    await semaphore.acquire();
    expect(semaphore.available()).toBe(0);

    semaphore.release();
    expect(semaphore.available()).toBe(1);
  });

  it("should block when capacity is reached", async () => {
    const semaphore = new Semaphore(2);

    await semaphore.acquire();
    await semaphore.acquire();

    let acquired = false;
    const acquirePromise = semaphore.acquire().then(() => {
      acquired = true;
    });

    // Wait a moment to ensure the acquire is blocked
    await delay(10);
    expect(acquired).toBe(false);

    semaphore.release();
    await acquirePromise;
    expect(acquired).toBe(true);
  });

  it("should handle multiple concurrent acquires and releases", async () => {
    const tasks = [1, 2, 3, 4, 5];
    const semaphore = new Semaphore(2);

    const results: number[] = [];

    const task = async (id: number) => {
      await semaphore.acquire();
      results.push(id);
      await delay(10);
      semaphore.release();
    };
    await Promise.all(tasks.map((id) => task(id)));

    expect(results).toHaveLength(5);
    expect(results).toEqual(tasks);
  });

  it("should not exceed capacity", async () => {
    const semaphore = new Semaphore(3);

    await semaphore.acquire();
    semaphore.release();
    expect(semaphore.available()).toBe(3);

    semaphore.release();
    expect(semaphore.available()).toBe(3);
  });
});
