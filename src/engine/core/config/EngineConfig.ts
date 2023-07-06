import { Scene } from "../ecs/Scene";
import { Shader } from "../gl/shader/Shader";
import { Renderer } from "../graphics/Renderer";
import { TextureConfig } from "./TextureConfig";

/**
 * The Configuration for {@link EngineConfig} defaults.
 * 
 * @interface DefaultsConfig
 */
interface DefaultsConfig {
    /** The name of the default Renderer. @type {string} */
    renderer: string;

    /** The name of the default Scene. @type {string} */
    scene: string;
}

/**
 * The Configuration for the Engine instance.
 * 
 * @interface EngineConfig
 */
export interface EngineConfig {
    // Some anonymous classes here -> new (): Type -> Described a class that returns Type when constructed (constructor returns Type).
    // Variable -> a: Type = (instance of Type);
    // Variable -> b: { new(): Type } = Type;

    /** The Renderers belonging to the Engine instance. @type { Array<{ new(): Renderer }> } */
    renderers: { new (): Renderer }[];

    /** The Scenes belonging to the Engine instance. @type { Array<{ new(): Scene }> } */
    scenes: { new (): Scene }[];

    /** The optional Textures belonging to the Engine instance. @type { Array<TextureConfig> }*/
    textures?: TextureConfig[];

    /** The optional array containing any custom Shaders that are going to be used. @type { Array<{ new(): Shader }> } */
    shaders?: { new (): Shader }[];

    /** The optional Layer order belonging to the Engine instance. Layers near the front of the Array get renderered closer to 
     * the Camera.
     * @type { Array<string> } 
     * */
    layers?: string[];

    /** The defaults for the Engien instance @type { DefaultsConfig } */
    defaults: DefaultsConfig;
}
