import { 
    Color,
    ColorMaterial,
    Entity,
    RenderComponent
} from "@GETS";

import { CarMesh } from "../meshes/CarMesh";

export class Car extends Entity {
    constructor(){
        // create a new renderer component
        const renderer: RenderComponent = new RenderComponent();

        // set the mesh of the render component to self-made car mesh
        renderer.mesh = new CarMesh();

        super("Car", [renderer]);
    };

    start(): void {
        (this.getComponent(RenderComponent).mesh.material as ColorMaterial).tint = Color.BLUE;
    };
};