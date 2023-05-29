import { Entity, Scene, DefaultEntity, MoveBehavior, SpriteComponent, Color } from "../../engine/GETS";

export class MyScene extends Scene {
    constructor() {
        super("MyScene");
    }

    // experimenting with LOAD placement
    public override load(): void {
        const ent: Entity = Entity.Spawn(DefaultEntity);
        const ent2: Entity = Entity.Spawn(DefaultEntity);
        const ent3: Entity = Entity.Spawn(DefaultEntity);

        ent3.getComponent(SpriteComponent).sprite.material.color = Color.BLACK;
        ent2.getComponent(SpriteComponent).sprite.material.color = Color.ORANGE;

        ent2.addChildren(ent);
        ent2.addBehaviors(new MoveBehavior());

        ent.transform.position[0] = 300;

        ent.transform.rotation = 0;
        // this.currentCamera.startFollow(ent);
        // ent.addChildren(this.currentCamera);

        super.load();
    }
}
