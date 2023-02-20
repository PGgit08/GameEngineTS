import { Entity } from "../ecs/Entity";
import { Triangle } from "../graphics/geometry/Triangle";
import { Mesh } from "../graphics/Mesh";
import { MeshComponent } from "../graphics/MeshComponent";
import { SampleBehavior } from "./SampleBehavior";

export class SampleEntity extends Entity {
    constructor() { 
        super("SampleEntity");
        this.addBehaviors(new SampleBehavior());
        this.addComponents(new MeshComponent(new Mesh(new Triangle())));
    }
}
