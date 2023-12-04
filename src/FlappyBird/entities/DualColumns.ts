import { Entity, Poolable } from "../../engine/GETS";
import { Column } from "./Column";

export class DualColumns extends Entity implements Poolable {
    private _active: boolean = false;

    set active(actv: boolean) {
        this._active = actv;
    }
    get active(): boolean {
        return this._active;
    }

    constructor() {
        super("DualColumns");

        const lower_column = new Column();
        const upper_column = new Column();

        upper_column.transform.rotate(180);
        upper_column.transform.position = [-10, -130];

        this.transform.scale = [1.7, 3];
        this.transform.position[1] = 170;

        this.addChildren(
            lower_column,
            upper_column
        )
    }
}