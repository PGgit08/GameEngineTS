import { Behavior, Pool } from "../../engine/GETS";
import { DualColumns } from "../entities/DualColumns";

export class ColumnBehavior extends Behavior {
    private _columnPool: Pool<DualColumns> = new Pool("ColumnPool");

    constructor() {
        super("ColumnBehavior");

        let initPool: DualColumns[] = []

        for (let i = 0; i <= 5; i ++) {
            initPool.push(new DualColumns());
        }

        this._columnPool.resetPool(initPool);
    }

    public override update(): void {
        
    }
}