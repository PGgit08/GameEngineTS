import { Renderer } from "../graphics/Renderer";

export class SampleRenderer extends Renderer {
    /**
     * A Sample Renderer to be used by Games.
     */
    constructor() { super("SampleRenderer", Renderer.CreateCanvas("default_renderer").id); }
}