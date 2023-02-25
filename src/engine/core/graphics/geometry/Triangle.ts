import { ShaderManager } from "../../managers/ShaderManager";
import { Geometry } from "./Geometry";

export class Triangle extends Geometry {
    constructor() {
        super();
    }

    protected setAttributes(): void {
        this._buffer.addAttribute({
            location: ShaderManager.getInstance().getShader("Shader2D").getAttributeLocation("a_position"),
            size: 2,
            offset: 0
        }); // add the position attribute
    }

    public data(): number[] {
        // MODEL SPACE (TEST)
        return [
            -50, -50,
            50, -50, 
            0, -100
        ]
    }
}
