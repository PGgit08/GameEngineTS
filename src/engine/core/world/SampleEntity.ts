import { Entity } from "../ecs/Entity";
import { SampleBehavior } from "./SampleBehavior";

export class SampleEntity extends Entity {
    constructor() { super("SampleEntity"); this.addBehaviors(new SampleBehavior()); }
}
