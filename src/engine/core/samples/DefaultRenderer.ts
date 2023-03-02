import { Renderer } from "../graphics/Renderer";
import { RendererManager } from "../managers/RendererManager";

export class DefaultRenderer extends Renderer {
    /**
     * A Default Renderer to be used by Games, automatically sets to current Renderer.
     */
    constructor() { super("DefaultRenderer"); RendererManager.getInstance().setCurrentRenderer(this); }
}