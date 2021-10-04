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
export class ShaderManager {
    private static _registeredShaders: {[name: string]: GLShader} = {};

    private static _isLoaded: boolean = false;

    public static get loaded(): boolean{
        return ShaderManager._isLoaded;
    };

    /**
     * Initializes the ShaderManager, adds Built-in shaders
     */
    public static Init(): void {
        ShaderManager.AddShader(new Shader2D());
        
        ShaderManager.Load();
    };

    /**
     * Load all the registered shaders.
     */
    public static Load(): void {
        for(let s in ShaderManager._registeredShaders){
            ShaderManager._registeredShaders[s].load();
        };

        ShaderManager._isLoaded = true;
    };

    /**
     * Adds a new Shader to the manager if the Shader isn't already registered.
     * @param shader The shader to register.
     */
    public static AddShader(shader: GLShader): void {
        // check if shader is typeof s
        for(let shader_name in ShaderManager._registeredShaders) {
            let checkShader = ShaderManager._registeredShaders[shader_name];
            if (shader.constructor.name == checkShader.constructor.name){
                throw new Error("This Shader Already Exists In Manager");
            }

            else {
                this._registeredShaders[shader.name] = shader;
            };
        };

        // if no shaders exist then add this shader without any check
        if( Object.keys(ShaderManager._registeredShaders).length == 0 ){
            this._registeredShaders[shader.name] = shader;
        };
    };

    /**
     * Retreive a Shader from the registered shaders.
     * @param name The name of the shader to retrieve.
     * @returns Shader.
     */
    public static GetShader(name: string): GLShader {
        return this._registeredShaders[name];
    };
};