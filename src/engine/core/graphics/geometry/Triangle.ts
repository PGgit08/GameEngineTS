import { Geometry } from "./Geometry";

/**
 * @classdesc
 * A {@link Geometry} of a triangle.
 * 
 * @class Triangle
 * @extends Geometry
 * 
 * @param {number} width - The width of this triangle.
 * @param {number} height - The height of this triangle.
 */
export class Triangle extends Geometry {
    constructor(width: number, height: number) {
        super("Triangle", width, height);
    }

    public override textureData(minTexX: number, minTexY: number, maxTexX: number, maxTexY: number): number[] {
        return [
            minTexX, minTexY,
            minTexX, maxTexY,
            maxTexX, minTexY,
        ];
    }

    public override positionData(): number[] {
        return [
            this._minX, this._minY,
            this._minX, this._maxY,
            this._maxX, this._minY
        ];
    }
}
