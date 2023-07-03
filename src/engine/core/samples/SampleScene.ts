import { Scene } from "../ecs/Scene";
import { SampleEntity } from "./SampleEntity";

/**
 * A Scene with a SampleEntity.
 */
export class SampleScene extends Scene {
    constructor() { super("SampleScene"); this.addEntities(new SampleEntity()); }
}
