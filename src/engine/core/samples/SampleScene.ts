import { Scene } from "../ecs/Scene";
import { SampleEntity } from "./SampleEntity";

/**
 * @classdesc
 * A sample Scene with a {@link SampleEntity}.
 * 
 * @class SampleScene
 * @extends Scene
 */
export class SampleScene extends Scene {
    constructor() { super("SampleScene"); this.addEntities(new SampleEntity()); }
}
