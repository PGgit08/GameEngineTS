import { Color } from '@GETS';
import { Material } from '@graphics/Materials/Material';
import { ShaderManager } from '@graphics/ShaderManager';

export class ColorMaterial extends Material {
    private _tint: Color;

    constructor(tint: Color = Color.white){
        super();

        // get the shader that associates with this material
        this._shader = ShaderManager.GetShader("Shader2D");

        this._tint = tint;
    };

    public get tint(): Color {
        return this._tint;
    };

    public set tint(tint: Color) {
        this._tint = tint;
    };
};