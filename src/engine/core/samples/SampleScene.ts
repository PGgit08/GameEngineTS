import { Scene } from "../ecs/Scene";
import { SampleEntity } from "./SampleEntity";

// THIS WOULD PROBABLY BE A PREFAB
export class SampleScene extends Scene {
    constructor() {
        super("SampleScene");
        const parentEntity = new SampleEntity();
        const childEntity = new SampleEntity();

        parentEntity.addChildren(childEntity);

        this.addEntities(parentEntity);
    }
}
