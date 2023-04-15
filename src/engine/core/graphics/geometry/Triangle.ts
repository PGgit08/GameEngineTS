import { Shader } from "../../gl/shader/Shader";
import { Geometry } from "./Geometry";

export class Triangle extends Geometry {
    constructor() {
        super(100, 100);
    }

    protected override setAttributes(shader: Shader): void {
        this._positionBuffer.addAttribute({
            location: shader.getAttributeLocation("a_position"),
            size: 2,
            offset: 0
        });

        this._textureBuffer.addAttribute({
            location: shader.getAttributeLocation("a_texcoord"),
            size: 2,
            offset: 0
        });
    }

    public textureData(minTexX: number, minTexY: number, maxTexX: number, maxTexY: number): number[] {
        return [
            minTexX, minTexY,
            minTexX, maxTexY,
            maxTexX, minTexY,
        ];
    }

    public positionData(): number[] {
        return [
            this._minX, this._minY,
            this._minX, this._maxY,
            this._maxX, this._minY
        ];
    }
}
