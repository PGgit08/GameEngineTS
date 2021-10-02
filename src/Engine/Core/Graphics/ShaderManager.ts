import { GLShader } from "@gl/GLShader";
import { Shader2D } from "@gl/Shaders/Shader2D";

/**
 * The config that tells what each shader must have.
 */
export class ShaderConfig {
    public static readonly UNIFORMS: string[] = ['model', 'projection', 'view'];
    public static readonly ATTRIBS: {[name: string]: number} = {'coords': 0};
};

/**
 * Manages Shaders
 */
export class ShaderManager{
    private static _registeredShaders: {[name: string]: GLShader} = {};

    private static _isLoaded: boolean = false;

    public static get loaded(): boolean{
        return ShaderManager._isLoaded;
    };

    /**
     * Initializes the ShaderManager, adds Built-in shaders
     */
    public static Init(){
        ShaderManager.AddShader(new Shader2D());
        
        ShaderManager.Load();
    };

    public static Load(){
        for(let s in ShaderManager._registeredShaders){
            ShaderManager._registeredShaders[s].load();
        };

        ShaderManager._isLoaded = true;
    };

    public static AddShader(shader: GLShader){
        this._registeredShaders[shader.name] = shader;
    };

    public static GetShader(name: string): GLShader{
        return this._registeredShaders[name];
    };
};