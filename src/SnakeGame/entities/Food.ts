import { vec2 } from "gl-matrix";
import { Color, StandardMaterial, Entity, Mesh, MeshComponent, Square } from "../../engine/GETS";

export class Food extends Entity {
    constructor(){
        super("Food");

        this.transform.scale = vec2.fromValues(0.15, 0.15);
        // this.transform.position = 

        this.addComponents(new MeshComponent(new Mesh(new Square(), new StandardMaterial(undefined, Color.RED))));
    }
}
