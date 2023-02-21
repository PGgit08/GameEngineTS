import { Shader } from "../gl/shader/Shader";
import { ShaderManager } from "../managers/ShaderManager";
import { Geometry } from "./geometry/Geometry";

export class Mesh {
    private _geometry: Geometry;
    private _shader: Shader;

    constructor(geometry: Geometry, shaderName: string) {
        this._geometry = geometry;
        this._shader = ShaderManager.getInstance().getShader(shaderName);
    }

    /**
     * Loads the Mesh, should be called in load() of Lifecycle
     */
    public load(): void {
        this._geometry.load();
    }

    /**
     * Renders the Mesh
     */
    public draw(): void {
        this._shader.use();
        this._geometry.draw();
    }
}