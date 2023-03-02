import { Scene } from "../core/ecs/Scene";
import { Renderer } from "../core/graphics/Renderer";

/**
 * The Configuration for an Engine instance.
 * @property {Array} renderers - The Renderer(s) to be used in the Game.
 * @property {Array} scenes - The Scene(s) to be used in the Game.
 */
export interface EngineConfig {
    // Some anynomous classes here -> new (): Type -> Described a class that returns Type when constructed (constructor returns Type).
    // Variable -> a: Type = (instance of Type);
    // Variable -> b: { new(): Type } = Type;
    renderers: { new (): Renderer }[];
    scenes: { new (): Scene }[];
}
