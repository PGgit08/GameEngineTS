/**
 * An async function that delays by a certian amounts of milliseconds before fufiling.
 * @param ms Milliseconds
 */
export const Wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
