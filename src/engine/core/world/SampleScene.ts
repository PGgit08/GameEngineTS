import { Scene } from "../scene/Scene";
import { SampleEntity } from "./SampleEntity";

export class SampleScene extends Scene {
    constructor() { super("SampleScene"); this.addEntities(new SampleEntity()); }
}
