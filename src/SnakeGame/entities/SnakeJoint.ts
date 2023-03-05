import { Entity, MeshComponent, Mesh, Square, ColorMaterial } from "../../engine/GETS";

export class SnakeJoint extends Entity {
    constructor() {
        super("SnakeJoint");

        this.addComponents(new MeshComponent(new Mesh(new Square(), new ColorMaterial())));
    }
}
