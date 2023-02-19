import Entity from "../ecs/Entity";
import SampleBehavior from "./SampleBehavior";

export default class SampleEntity extends Entity {
    constructor() { super("SampleEntity"); this.addBehaviors(new SampleBehavior()); }
}
