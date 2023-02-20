import { Geometry } from "./Geometry";

export class Triangle extends Geometry {
    constructor() {
        super();
    }

    protected setAttributes(): void {
        this._buffer.addAttribute({location: 0, size: 4, offset: 0}); // add the position attribute
    }

    public data(): number[] {
        // NOT CLIPSPACE YET
        return [
            0, 0, 0, 0,
            0, 0.5, 0, 0,
            0.7, 0, 0, 0
        ]
    }
}
