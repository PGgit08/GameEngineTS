import { vec2 } from "gl-matrix";
import { Entity, MeshComponent, Mesh, Square, ColorMaterial, Color } from "../../engine/GETS";

export class SnakeJoint extends Entity {
    constructor() {
        super("SnakeJoint");

        this.transform.scale = vec2.fromValues(0.2, 0.2);

        this.addComponents(new MeshComponent(new Mesh(new Square(), new ColorMaterial(Color.YELLOW))));
    }
}
