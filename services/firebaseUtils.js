const TIMEOUT_MS = 10000;

export function withTimeout(promise, ms = TIMEOUT_MS) {
  return Promise.race([
    promise,
    new Promise((_, reject) =>
      setTimeout(() => reject(new Error('Firebase timeout')), ms)
    ),
  ]);
}
