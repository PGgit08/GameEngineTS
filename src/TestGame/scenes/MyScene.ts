import { vec2 } from "gl-matrix";
import { Scene } from "../../engine/core/ecs/Scene";
import { Square } from "../../engine/core/graphics/geometry/Square";
import { ColorMaterial } from "../../engine/core/graphics/material/ColorMaterial";
import { Mesh } from "../../engine/core/graphics/Mesh";
import { MeshComponent } from "../../engine/core/graphics/MeshComponent";
import { Entity, MoveBehavior, SceneManager } from "../../engine/GETS";

export class MyScene extends Scene {
    constructor() {
        super("MyScene");

        SceneManager.getInstance().setCurrentScene(this);

        const entity1: Entity = new Entity("Entity1");
        const entity2: Entity = new Entity("Entity2");

        entity1.addComponents(new MeshComponent(new Mesh(new Square(), new ColorMaterial())));
        entity2.addComponents(new MeshComponent(new Mesh(new Square(), new ColorMaterial())));

        entity1.addBehaviors(new MoveBehavior());

        entity1.transform.position = vec2.fromValues(100, 100);
        entity2.transform.position = vec2.fromValues(100, 200);

        entity1.addChildren(entity2);

        this.addEntities(entity1);
    }
}
