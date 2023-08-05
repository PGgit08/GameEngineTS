import Dictionary from "../../types/Dictionary";
import { Shader } from "../gl/shader/Shader";
import { Lifecycle } from "../Lifecycle";
import { NameRegistrar } from "../helpers/NameRegistrar";

import { StandardShader } from "../gl/shader/StandardShader";

/**
 * @classdesc
 * A NameRegistrar singleton that holds {@link Shader} classes. Shaders are automatically added to this manager when created. 
 * This manager implements the {@link Lifecycle} interface, and during {@link load} it loads all the Shaders added to it.
 * 
 * @class ShaderManager
 * @extends NameRegistrar
 * @implements {Lifecycle}
 * 
 * @hideconstructor
 */
export class ShaderManager extends NameRegistrar implements Lifecycle {
    private static _instance: ShaderManager;
    
    private _gameShaders: Dictionary<string, Shader> = {};

    private _loaded: boolean = false;

    /**
     * @returns {ShaderManager} The single instance of the {@link ShaderManager}. 
     */
    public static getInstance(): ShaderManager {
        if (!this._instance) {
            this._instance = new ShaderManager();
        }

        return this._instance;
    }

    private constructor() { super("ShaderManager"); }

    /**
     * Adds a Shader to this manager. If this manager has been loaded and the added Shader has not been loaded, then it will
     * automatically load the added Shader.
     * 
     * @param {Shader} shader - The Shader being added.
     */
    public addShader(shader: Shader) {
        this.registerName(shader.name);
        this._gameShaders[shader.name] = shader;

        if (this._loaded) shader.load();
    }

    /**
     * Gets a Shader from this manager by its name. If it is not found, the {@link StandardShader} is returned.
     * 
     * @param {string} name - The name of the Shader.
     */
    public getShader(name: string): Shader {
        if (this._gameShaders[name] === undefined) return this.getShader("StandardShader");

        return this._gameShaders[name];
    }

    public load(): void {
        if (this._loaded) return;

        Object.values(this._gameShaders).forEach((s) => s.load());

        this._loaded = true;
    }

    public update(): void {}
    public render(): void {}

    public unload(): void {
        if (!this._loaded) return;

        Object.values(this._gameShaders).forEach((s) => s.unload());

        this._loaded = false;
    }
}
