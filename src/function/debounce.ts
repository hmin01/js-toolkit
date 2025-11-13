import type { OperationOptions } from "../_types";

export interface DebounceOptions extends OperationOptions {
  /**
   * Specify when to invoke the function
   * - "leading": invoke at the start of the wait period
   * - "trailing": invoke at the end of the wait period
   */
  edges?: Array<"leading" | "trailing">;
}

/**
 * Create a debounced function that delays invoking `func` until after `wait` milliseconds have elapsed
 * @param func callback function to be debounced
 * @param wait number of milliseconds to delay invocation
 * @param options Debounce options
 * @returns The debounced function
 */
export function debounce<TFunc extends (...args: any[]) => void>(func: TFunc, wait: number, { edges = ["trailing"], signal }: DebounceOptions = {}) {
  let _timeoutId: ReturnType<typeof setTimeout> | null = null;
  // Last arguments and context to use when invoking the function
  let _lastArgs: Parameters<TFunc> | null = null;
  let _lastThis: any = undefined;

  const _clearTimeout = () => {
    if (_timeoutId !== null) {
      clearTimeout(_timeoutId);
      _timeoutId = null;
    }
  };
  const _clearVariables = () => {
    _lastArgs = null;
    _lastThis = undefined;
  };
  const _invoke = () => {
    if (_lastArgs !== null) {
      func.apply(_lastThis, _lastArgs);
      _clearVariables();
    }
  };

  const cancel = () => {
    _clearTimeout();
    _clearVariables();
  };

  const flush = () => {
    _invoke();
  };

  const debounced = function (this: any, ...args: Parameters<TFunc>) {
    if (signal?.aborted) return;

    _lastArgs = args;
    _lastThis = this;

    if (_timeoutId !== null) {
      _clearTimeout();
    } else if (edges?.includes("leading")) {
      _invoke();
    }

    _timeoutId = setTimeout(() => {
      if (edges?.includes("trailing")) {
        _invoke();
      }
      cancel();
    }, wait);
  };

  debounced.cancel = cancel;
  debounced.flush = flush;

  signal?.addEventListener("abort", cancel, { once: true });

  return debounced;
}
