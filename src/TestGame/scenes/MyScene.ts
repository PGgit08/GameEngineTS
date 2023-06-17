import { Camera, Color, DefaultEntity, Entity, MoveBehavior, Scene, SpriteComponent } from "../../engine/GETS";

export class MyScene extends Scene {
    constructor() {
        super("MyScene");
    }

    // experimenting with LOAD placement
    public override load(): void {
        // const ent: Entity = Entity.Spawn(Entity1);
        const ent2: Entity = Entity.Spawn(DefaultEntity);
        const ent3: Entity = Entity.Spawn(DefaultEntity);

        const cam: Camera = new Camera("Cam");

        ent3.addChildren(ent2);

        console.log(ent2.parentScenes);

        ent3.getComponent(SpriteComponent).sprite.material.color = Color.BLACK;

        ent2.addBehaviors(new MoveBehavior(50));
        ent3.addBehaviors(new MoveBehavior(50));
        
        ent3.transform.position[0] = 0;
        ent2.transform.position[1] = 100;

        this.addCamera(cam);
        this.setCurrentCamera("Cam");

        super.load();
    }
}
