import { Geometry } from "./Geometry";

/**
 * @classdesc
 * A {@link Geometry} of a square.
 * 
 * @class Square
 * @extends Geometry
 * 
 * @param {number} width - The width of this square.
 * @param {number} height - The height of this square.
 */
export class Square extends Geometry {
    constructor(width: number, height: number) {
        super("Square", width, height);
    }

    public override textureData(minTexX: number, minTexY: number, maxTexX: number, maxTexY: number): number[] {
        return [
            minTexX, minTexY,
            minTexX, maxTexY,
            maxTexX, maxTexY,
            maxTexX, maxTexY,
            maxTexX, minTexY,
            minTexX, minTexY
        ];
    }

    public override positionData(): number[] {
        return [
            this._minX, this._minY,
            this._minX, this._maxY, 
            this._maxX, this._maxY,
            this._maxX, this._maxY,
            this._maxX, this._minY,
            this._minX, this._minY
        ];
    }
}
