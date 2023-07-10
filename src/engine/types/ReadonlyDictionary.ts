/**
 * A dictionary with readonly keys following the {key: value} structure.
 * 
 * @template {string | number | symbol} T1
 * @template {any} T2
 */
type ReadonlyDictionary<T1 extends string | number | symbol, T2> = { readonly [P in T1]: T2 };

export default ReadonlyDictionary;
