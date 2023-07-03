import Dictionary from "../../extra/Dictionary";
import { Texture } from "../graphics/Texture";
import { Lifecycle } from "../Lifecycle";
import { NameRegistrar } from "../helpers/NameRegistrar";

export class TextureManager extends NameRegistrar implements Lifecycle {
    private static _instance: TextureManager;

    private _gameTextures: Dictionary<string, Texture> = {};

    public static getInstance(): TextureManager {
        if (!this._instance) {
            this._instance = new TextureManager();
        }

        return this._instance;
    }

    constructor() { super("TextureManager"); }

    public addTexture(tex: Texture): void {
        this.registerName(tex.name);
        this._gameTextures[tex.name] = tex;
    }

    public getTextureByName(texName: string): Texture {
        if (this._gameTextures[texName] !== undefined) {
            return this._gameTextures[texName];
        } else {
            return this.getTextureByName('WHITE');            
        }
    }

    public load(): void {
        Object.values(this._gameTextures).forEach((t) => t.load());
    }

    public update(): void {}
    public render(): void {}
}
