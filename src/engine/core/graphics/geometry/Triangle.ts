import { ShaderManager } from "../../managers/ShaderManager";
import { Geometry } from "./Geometry";

export class Triangle extends Geometry {
    constructor() {
        super();
    }

    protected setAttributes(): void {
        this._positionBuffer.addAttribute({
            location: ShaderManager.getInstance().getShader("ColorShader").getAttributeLocation("a_position"),
            size: 2,
            offset: 0
        }); // add the position attribute
    }

    public textureData(): number[] {
        return [];
    }

    public positionData(): number[] {
        return [
            -50, -50,
            50, -50, 
            0, -100
        ];
    }
}
