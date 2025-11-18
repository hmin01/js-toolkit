import { TimeoutError } from "../_errors";
import { delay } from "./delay";

/**
 * Returns a promise that rejects with a timeout error after ms milliseconds.
 * @param ms The number of milliseconds to wait before rejecting.
 */
async function timeout<T>(ms: number): Promise<T> {
  await delay(ms);
  throw new TimeoutError();
}

/**
 * Returns a promise that resolves or rejects with the given promise
 * @param func A function that returns a promise
 * @param ms The number of milliseconds to wait before timing out
 * @returns A promise that resolves or rejects with the given promise, or rejects with a timeout error after ms milliseconds
 *
 * @example
 * ```ts
 * async function fetchData(){
 *   const res = await fetch("https://example.com/data");
 *   return res.json();
 * }
 *
 * withTimeout(fetchData, 500)
 *   .then(console.log)
 *   .catch(console.error); // TimeoutError after 500ms
 * ```
 */
export async function withTimeout<T>(func: () => Promise<T>, ms: number): Promise<T> {
  return Promise.race([func(), timeout<T>(ms)]);
}
