/**
 * Creates a Dictoionary where key type is first argument and value type is second argument
 */
export type Dictionary<T1 extends string | number | symbol, T2> = Record<T1, T2>;
