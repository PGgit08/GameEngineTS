import { Geometry } from "./geometry/Geometry";

export class Mesh {
    private _geometry: Geometry;

    constructor(geometry: Geometry) {
        this._geometry = geometry;
    }

    /**
     * Loads the Mesh, should be called in load() of Lifecycle
     */
    public load(): void {
        this._geometry.load();
    }

    /**
     * Renders the Mesh
     */
    public draw(): void {
        this._geometry.draw();
    }
}