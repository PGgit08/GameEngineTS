import { NameRegistrar } from "./NameRegistrar";
import { Poolable } from "./Poolable";

export class Pool<T extends Poolable> extends NameRegistrar {
    private _pool: T[] = [];

    constructor(name: string) {
        super(name);
    }

    public resetPool(pool: T[]): void {
        this._pool = pool;
    }

    public getObject(): T {
        for (var o of this._pool) {
            if (!o.active) {
                return o;
            }
        }

        return null;
    }
}
