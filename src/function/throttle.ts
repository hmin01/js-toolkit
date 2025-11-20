import type { OperationOptions } from "../_types";
import { debounce } from "./debounce";

interface ThrottleOptions extends OperationOptions {
  /**
   * Specify when to invoke the function
   * - "leading": invoke at the start of the wait period
   * - "trailing": invoke at the end of the wait period
   */
  edges?: Array<"leading" | "trailing">;
}

export interface ThrottleFunction<TFunc extends (...args: any[]) => void> {
  (...args: Parameters<TFunc>): void;
  /**
   * Cancel any pending function invocations
   */
  cancel: () => void;
  /**
   * Immediately invoke the throttled function if there is a pending invocation
   */
  flush: () => void;
}

/**
 * Create a throttled function that only invokes `func` at most once every `wait` milliseconds.
 * @see https://github.com/toss/es-toolkit/blob/v1.41.0/src/function/throttle.ts
 * @param func callback function to be throttled
 * @param wait number of milliseconds to throttle invocation
 * @param options Throttle options
 * @returns The throttled function
 */
export function throttle<TFunc extends (...args: any[]) => void>(
  func: TFunc,
  wait: number,
  { edges = ["leading", "trailing"], signal }: ThrottleOptions = {}
): ThrottleFunction<TFunc> {
  let startedAt: number | null = null;

  const debounced = debounce(func, wait, { edges, signal });

  const throttled = function (this: any, ...args: Parameters<TFunc>) {
    const _now = Date.now();

    if (startedAt === null) {
      startedAt = _now;
    } else if (_now - startedAt >= wait) {
      startedAt = _now;
      debounced.cancel();
    }

    debounced.apply(this, args);
  };

  throttled.cancel = debounced.cancel;
  throttled.flush = debounced.flush;

  return throttled;
}
