import { Entity, Poolable } from "../../engine/GETS";

export class Ground extends Entity implements Poolable {
    private _active: boolean = false;

    set active(actv: boolean) {
        this.enabled = actv;
    }

    get active(): boolean {
        return this._active
    }

    constructor() {
        super("Ground");
    }
}
