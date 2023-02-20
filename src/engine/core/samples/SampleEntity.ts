import { Entity } from "../ecs/Entity";
import { MeshComponent } from "../graphics/MeshComponent";
import { SampleBehavior } from "./SampleBehavior";

export class SampleEntity extends Entity {
    constructor() { 
        super("SampleEntity");
        this.addBehaviors(new SampleBehavior());
        this.addComponents(new MeshComponent());
    }
}
