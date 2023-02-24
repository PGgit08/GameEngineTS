import { Scene } from "../ecs/Scene";
import { DefaultEntity } from "./DefaultEntity";

// THIS WOULD PROBABLY BE A PREFAB
/**
 * A Scene with a single DefaultEntity.
 */
export class DefaultScene extends Scene {
    constructor() { super("DefaultScene"); this.addEntities(new DefaultEntity()); }
}
