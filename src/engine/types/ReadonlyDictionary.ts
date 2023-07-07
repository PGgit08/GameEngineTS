type ReadonlyDictionary<T1 extends string | number | symbol, T2> = { readonly [P in T1]: T2 };

export default ReadonlyDictionary;
