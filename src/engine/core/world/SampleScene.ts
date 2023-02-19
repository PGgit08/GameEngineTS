import Scene from "../scene/Scene";
import SampleEntity from "./SampleEntity";

export default class SampleScene extends Scene {
    constructor() { super("SampleScene"); this.addEntities(new SampleEntity()); }
}
