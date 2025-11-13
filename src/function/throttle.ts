import type { OperationOptions } from "../_types";
import { debounce } from "./debounce";

export interface ThrottleOptions extends OperationOptions {
  /**
   * Specify when to invoke the function
   * - "leading": invoke at the start of the wait period
   * - "trailing": invoke at the end of the wait period
   */
  edges?: Array<"leading" | "trailing">;
}

export function throttle<TFunc extends (...args: any[]) => void>(func: TFunc, wait: number, { edges = ["leading", "trailing"], signal }: ThrottleOptions = {}) {
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
