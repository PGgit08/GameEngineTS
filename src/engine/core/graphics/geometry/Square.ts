import { ShaderConfig } from "../../gl/shader/ShaderConfig";
import { Shader } from "../../gl/shader/Shader";
import { Geometry } from "./Geometry";

export class Square extends Geometry {
    constructor() {
        super(100, 100);
    }

    protected override setAttributes(shader: Shader): void {
        this._positionBuffer.addAttribute({
            location: shader.getAttributeLocation(ShaderConfig.POSITION_ATTRIBUTE_NAME),
            size: ShaderConfig.POSITION_ATTRIBUTE_SIZE,
            offset: 0
        });

        this._textureBuffer.addAttribute({
            location: shader.getAttributeLocation(ShaderConfig.TEXTURE_ATTRIBUTE_NAME),
            size: ShaderConfig.TEXTURE_ATTRIBUTE_SIZE,
            offset: 0
        });
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
