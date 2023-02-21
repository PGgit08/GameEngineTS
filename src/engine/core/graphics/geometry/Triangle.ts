import { ShaderManager } from "../../managers/ShaderManager";
import { Geometry } from "./Geometry";

export class Triangle extends Geometry {
    constructor(mode: number = gl.TRIANGLES) {
        super(mode);
    }

    protected setAttributes(): void {
        this._buffer.addAttribute({
            location: ShaderManager.getInstance().getShader("Shader2D").getAttributeLocation("a_position"),
            size: 4,
            offset: 0
        }); // add the position attribute
    }

    public data(): number[] {
        // NOT CLIPSPACE YET
        return [
            0, 0, 0, 1,
            0, 0.5, 0, 1,
            0.5, 0.5, 0, 1
        ]
    }
}
