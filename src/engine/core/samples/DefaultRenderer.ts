import { Renderer } from "../graphics/Renderer";
import { RendererManager } from "../managers/RendererManager";

export class DefaultRenderer extends Renderer {
    constructor() { super("DefaultRenderer"); RendererManager.getInstance().setCurrentRenderer(this); }
}