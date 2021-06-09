import { GLShader } from "@gl/GLShader";
import { Shader2D } from "./Shaders/Shader2D";

/**
 * Manages Shaders
 */
export class ShaderManager{
    public static REGISTERED_SHADERS: {[name: string]: GLShader} = {};

    public static ACTIVE_SHADER: GLShader;

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
        for(let s in ShaderManager.REGISTERED_SHADERS){
            ShaderManager.REGISTERED_SHADERS[s].load();
        };

        ShaderManager._isLoaded = true;
    };

    public static AddShader(shader: GLShader){
        this.REGISTERED_SHADERS[shader.name] = shader;
    };
};