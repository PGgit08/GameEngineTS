import Dictionary from "../../types/Dictionary";
import { Texture } from "../graphics/Texture";
import { Lifecycle } from "../Lifecycle";
import { NameRegistrar } from "../helpers/NameRegistrar";

/**
 * @classdesc
 * A NameRegistrar singleton that holds {@link Texture} classes. Textures are automatically added to this manager when created. 
 * This manager implements the {@link Lifecycle} interface, and during {@link load} it loads all the Textures added to it.
 * 
 * @class TextureManager
 * @extends NameRegistrar
 * @implements {Lifecycle}
 * 
 * @hideconstructor
 */
export class TextureManager extends NameRegistrar implements Lifecycle {
    private static _instance: TextureManager;

    private _gameTextures: Dictionary<string, Texture> = {};

    private _loaded: boolean = false;

    public static getInstance(): TextureManager {
        if (!this._instance) {
            this._instance = new TextureManager();
        }

        return this._instance;
    }

    private constructor() { super("TextureManager"); }


    /**
     * Adds a Texture to this manager. If this manager has been loaded and the added Texture has not been loaded, then it will
     * automatically load the added Texture.
     * 
     * @param {Texture} tex - The Shader being added.
     */
    public addTexture(tex: Texture): void {
        this.registerName(tex.name);
        this._gameTextures[tex.name] = tex;

        if (this._loaded) tex.load();
    }

    /**
     * Gets a Shader from this manager by its name. If it is not found, a default WHITE Texture is returned.
     * 
     * @param {string} name - The name of the Texture.
     */
    public getTexture(name: string): Texture {
        if (this._gameTextures[name] === undefined) return this.getTexture('WHITE');
    
        return this._gameTextures[name];
    }

    public load(): void {
        if (this._loaded) return;
    
        Object.values(this._gameTextures).forEach((t) => t.load());

        this._loaded = true;
    }

    public update(): void {}
    public render(): void {}

    public unload(): void {
        
    }
}
