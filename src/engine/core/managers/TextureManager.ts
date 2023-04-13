import Dictionary from "../../extra/Dictionary";
import { Texture } from "../graphics/Texture";
import { Lifecycle } from "../Lifecycle";
import { Manager } from "./Manager";

export class TextureManager extends Manager implements Lifecycle {
    private static _instance: TextureManager;

    private _gameTextures: Dictionary<string, Texture> = {};

    public static getInstance(): TextureManager {
        if (!this._instance) {
            this._instance = new TextureManager();
        }

        return this._instance;
    }

    constructor() { super(); }

    public addTexture(tex: Texture): void {
        this.registerName(tex.name);
        this._gameTextures[tex.name] = tex;
    }

    public getTextureByName(texName: string): Texture {
        if (this._gameTextures[texName] !== undefined) {
            return this._gameTextures[texName];
        } else {
            return this.getTextureByName('BLACK');            
        }
    }

    public load(): void {
        new Texture('BLACK');

        Object.values(this._gameTextures).forEach((t) => t.load());
    }

    public start(): void {}
    public update(): void {}
    public render(): void {}
}
