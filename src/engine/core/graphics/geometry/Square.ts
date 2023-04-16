import { Geometry } from "./Geometry";

export class Square extends Geometry {
    constructor() {
        super(100, 100);
    }

    public textureData(minTexX: number, minTexY: number, maxTexX: number, maxTexY: number): number[] {
        return [
            minTexX, minTexY,
            minTexX, maxTexY,
            maxTexX, maxTexY,
            maxTexX, maxTexY,
            maxTexX, minTexY,
            minTexX, minTexY
        ];
    }

    public positionData(): number[] {
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
