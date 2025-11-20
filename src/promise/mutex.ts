import { Semaphore } from "./semaphore";

/**
 * A mutex for async functions, allowing only one task to access a critical section at a time
 *
 * @example
 * ```ts
 * const mutex = new Mutex();
 * await mutex.acquire();
 * // critical section
 * mutex.release();
 * ```
 */
export class Mutex {
  private _semaphore: Semaphore;

  constructor() {
    this._semaphore = new Semaphore(1);
  }

  /**
   * Acquire the mutex, waiting if necessary until it is available
   * @returns A promise that resolve when the mutex is acquired
   */
  acquire(): Promise<void> {
    return this._semaphore.acquire();
  }

  /**
   * Checks if the mutex is currently locked
   * @returns true if locked, false otherwise
   */
  isLocked(): boolean {
    return this._semaphore.available() === 0;
  }

  /**
   * Release the mutex
   */
  release(): void {
    this._semaphore.release();
  }
}
