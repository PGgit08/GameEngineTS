import { ShaderManager } from "../../managers/ShaderManager";
import { Geometry } from "./Geometry";

export class Square extends Geometry {
    constructor() {
        super();
    }

    protected setAttributes(): void {
        this._buffer.addAttribute({
            location: ShaderManager.getInstance().getShader("ColorShader").getAttributeLocation("a_position"),
            size: 2,
            offset: 0
        })
    }

    public data(): number[] {
        return [
            -50, -50,
            -50, 50, 
            50, 50,
            50, 50,
            50, -50,
            -50, -50
        ]
    }
}
