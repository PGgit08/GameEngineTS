import Dictionary from "../../extra/Dictionary";
import { Shader } from "../gl/shader/Shader";
import { Lifecycle } from "../Lifecycle";
import { Manager } from "./Manager";
import { Shader2D } from "../gl/shader/Shader2D";

export class ShaderManager extends Manager implements Lifecycle {
    private static _instance: ShaderManager;
    
    private _gameShaders: Dictionary<string, Shader> = {};

    public static getInstance(): ShaderManager {
        if (!this._instance) {
            this._instance = new ShaderManager();
        }

        return this._instance;
    }

    constructor() { super(); }

    public addShader(shader: Shader) {
        this.registerName(shader.name);
        this._gameShaders[shader.name] = shader;
    }

    public getShader(name: string): Shader {
        return this._gameShaders[name];
    }

    public load(): void {
        new Shader2D();

        Object.values(this._gameShaders).forEach((s) => s.load());
    }

    public start(): void {}
    public update(): void {}
    public render(): void {}
}
