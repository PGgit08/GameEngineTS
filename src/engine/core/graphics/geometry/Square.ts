import { ShaderManager } from "../../managers/ShaderManager";
import { Geometry } from "./Geometry";

export class Square extends Geometry {
    constructor() {
        super();
    }

    protected setAttributes(): void {
        this._positionBuffer.addAttribute({
            location: ShaderManager.getInstance().getShader("Shader2D").getAttributeLocation("a_position"),
            size: 2,
            offset: 0
        });

        this._textureBuffer.addAttribute({
            location: ShaderManager.getInstance().getShader("Shader2D").getAttributeLocation("a_texcoord"),
            size: 2,
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
            -50, -50,
            -50, 50, 
            50, 50,
            50, 50,
            50, -50,
            -50, -50
        ];
    }
}
