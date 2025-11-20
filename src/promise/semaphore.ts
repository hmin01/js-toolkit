/**
 * A semaphore implementation to control access to a shared resource by multiple tasks
 *
 * @example
 * ```ts
 * const semaphore = new Semaphore(2);
 * await semaphore.acquire();
 * // critical section
 * semaphore.release();
 * ```
 */
export class Semaphore {
  /**
   * The maximum number of concurrent tasks
   */
  public capacity: number;

  /**
   * The number of available tasks
   */
  private _available: number;
  /**
   * The queue of pending tasks waiting for a permit
   */
  private _tasks: Array<() => void> = [];

  /**
   * Create a Semaphore with the given capacity
   * @param capacity The maximum number of concurrent tasks
   */
  constructor(capacity: number) {
    this.capacity = capacity;
    this._available = capacity;
  }

  /**
   * Acquire a permit from the semaphore, waiting if necessary until one is available
   * @returns A promise that resolves when the permit is acquired
   */
  async acquire(): Promise<void> {
    if (this._available > 0) {
      this._available--;
      return;
    }

    return new Promise((resolve) => {
      this._tasks.push(resolve);
    });
  }

  /**
   * Get the number of available tasks
   * @returns The number of available tasks
   */
  available(): number {
    return this._available;
  }

  /**
   * Release a task permit, returning it to the semaphore
   */
  release(): void {
    const _task = this._tasks.shift();

    if (_task != undefined) {
      _task();
    } else if (this._available < this.capacity) {
      this._available++;
    }
  }
}
