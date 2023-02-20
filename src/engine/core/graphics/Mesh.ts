import { Geometry } from "./geometry/Geometry";

export class Mesh {
    private _geometry: Geometry;

    constructor(geometry: Geometry) {
        this._geometry = geometry;
    }

    public draw(): void {
        this._geometry.draw();
    }
}