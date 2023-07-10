import { Renderer } from "../graphics/Renderer";

/**
 * @classdesc
 * A sample {@link Renderer} to be used by games. It uses the {@link Renderer.CreateCanvas} to create the canvas object.
 * 
 * @class SampleRenderer
 * @extends Renderer
 */
export class SampleRenderer extends Renderer {
    constructor() { super("SampleRenderer", Renderer.CreateCanvas("sampleRenderer").id); }
}