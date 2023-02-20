import { Shader } from "../gl/shader/Shader";
import { ShaderManager } from "../managers/ShaderManager";
import { Geometry } from "./geometry/Geometry";

export class Mesh {
    private _geometry: Geometry;
    private _shaderName: string;

    constructor(geometry: Geometry, shaderName: string) {
        this._geometry = geometry;
        this._shaderName = shaderName;
    }

    /**
     * Loads the Mesh, should be called in load() of Lifecycle
     */
    public load(): void {
        this._geometry.load();
        ShaderManager.getInstance().getShader(this._shaderName);
    }

    /**
     * Renders the Mesh
     */
    public draw(): void {
        ShaderManager.getInstance().getShader(this._shaderName).use();
        this._geometry.draw();
    }
}