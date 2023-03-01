import { Scene } from "../../engine/core/ecs/Scene";
import { Vector2 } from "../../engine/core/math/Vector2";
import { Entity, SceneManager } from "../../engine/GETS";

export class MyScene extends Scene {
    constructor() {
        super("MyScene");

        const entity1: Entity = new Entity("Entity1");
        const entity2: Entity = new Entity("Entity2");

        entity1.transform.position = new Vector2(100, 100);
        entity2.transform.position = new Vector2(100, 200);

        entity1.addChildren(entity2);

        this.addEntities(entity1);

        SceneManager.getInstance().setCurrentScene(this);
    }
}
