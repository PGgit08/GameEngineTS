import { vec2 } from "gl-matrix";
import { Color, ColorMaterial, Entity, Mesh, MeshComponent, RendererManager, Square } from "../../engine/GETS";

export class Food extends Entity {
    constructor(){
        super("Food");

        this.transform.scale = vec2.fromValues(0.15, 0.15);
        // this.transform.position = 

        this.addComponents(new MeshComponent(new Mesh(new Square(), new ColorMaterial(Color.RED))));
    }
}
