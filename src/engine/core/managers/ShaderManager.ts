import Dictionary from "../../extra/Dictionary";
import { Shader } from "../gl/shader/Shader";
import { Lifecycle } from "../Lifecycle";
import { NameRegistrar } from "../helpers/NameRegistrar";

export class ShaderManager extends NameRegistrar implements Lifecycle {
    private static _instance: ShaderManager;
    
    private _gameShaders: Dictionary<string, Shader> = {};

    private _loaded: boolean = false;

    public static getInstance(): ShaderManager {
        if (!this._instance) {
            this._instance = new ShaderManager();
        }

        return this._instance;
    }

    private constructor() { super("ShaderManager"); }

    public addShader(shader: Shader) {
        this.registerName(shader.name);
        this._gameShaders[shader.name] = shader;

        if (this._loaded) shader.load();
    }

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
}
