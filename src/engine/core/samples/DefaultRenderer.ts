import { Renderer } from "../graphics/Renderer";

export class DefaultRenderer extends Renderer {
    /**
     * A Default Renderer to be used by Games.
     */
    constructor() { super("DefaultRenderer", Renderer.createCanvas("default_renderer").id); }
}