import { ShaderManager } from "../../managers/ShaderManager";
import { Geometry } from "./Geometry";

export class Triangle extends Geometry {
    constructor() {
        super();
    }

    protected setAttributes(): void {
        this._positionBuffer.addAttribute({
            location: ShaderManager.getInstance().getShader("Shader2D").getAttributeLocation("a_position"),
            size: 2,
            offset: 0
        }); // TODO: add the texture attribute
    }

    public textureData(): number[] {
        return []; // TODO: add the texture data
    }

    public positionData(): number[] {
        return [
            -50, -50,
            50, -50, 
            0, -50
        ];
    }
}
