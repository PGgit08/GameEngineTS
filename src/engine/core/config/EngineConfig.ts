import { Scene } from "../ecs/Scene";
import { Renderer } from "../graphics/Renderer";
import { TextureInfo } from "./TextureInfo";

/**
 * The Configuration for EngineConfig defaults.
 * @property {string} renderer - The name of the default Renderer.
 * @property {string} scene - The name of the default Scene.
 */
interface DefaultsConfig {
    renderer: string;
    scene: string;
}

/**
 * The Configuration for the Engine instance.
 */
export interface EngineConfig {
    // Some anonymous classes here -> new (): Type -> Described a class that returns Type when constructed (constructor returns Type).
    // Variable -> a: Type = (instance of Type);
    // Variable -> b: { new(): Type } = Type;

    /** The Renderers belonging to the Engine instance. @type { Array<{ new(): Renderer }> } */
    renderers: { new (): Renderer }[];

    /** The Scenes belonging to the Engine instance. @type { Array<{ new(): Scene }> } */
    scenes: { new (): Scene }[];

    /** The optional Textures belonging to the Engine instance. @type { Array<TextureInfo> }*/
    textures?: TextureInfo[];

    /** The optional Layer order belonging to the Engine instance. Layers near the front of the Array get renderered closer to 
     * the Camera.
     * @type { Array<string> } 
     * */
    layers?: string[];

    /** The defaults for the Engien instance @type { DefaultsConfig } */
    defaults: DefaultsConfig;
}
