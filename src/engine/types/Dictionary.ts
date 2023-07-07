/**
 * A dictionary following the {key: value} structure.
 * 
 * @typedef {{ [P in T1]: T2 }}
 * 
 * @template {string | number | symbol} T1
 * @template {any} T2 
 */
type Dictionary<T1 extends string | number | symbol, T2> = { [P in T1]: T2 };

export default Dictionary;
