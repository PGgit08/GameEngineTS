import { Entity } from "../ecs/Entity";

export class SampleEntity extends Entity {
    constructor() { super("SampleEntity"); console.log("SampleEntity Created!"); }
}
