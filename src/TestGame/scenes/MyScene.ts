import { Camera, Color, DefaultEntity, Entity, Event, EventManager, Events, MoveBehavior, Scene, SceneManager, SpriteComponent } from "../../engine/GETS";
import { LookAtBehavior } from "../behaviors/LookAtBehavior";
import { Background } from "../entities/Background";

export class MyScene extends Scene {
    constructor() {
        super("MyScene");
    }

    // experimenting with LOAD placement
    public override load(): void {
        // const ent: Entity = Entity.Spawn(Entity1);
        const ent2: Entity = Entity.Spawn(DefaultEntity);
        const ent3: Entity = Entity.Spawn(DefaultEntity);

        // TEST 
        EventManager.getInstance().subscribeTo<null>(Events.SCENE_CHANGE, (eventData) => {
            console.log(eventData.eventName);
        });

        // this.addEntities(new Background("FTEXT"));

        const cam: Camera = new Camera("Cam");  

        // cam.size = 5;

        ent3.addChildren(ent2);
        // ent3.addChildren(cam);

        // console.log(ent2.parentScene);

        ent3.getComponent(SpriteComponent).sprite.material.color = Color.BLACK;

        ent2.addBehaviors(new MoveBehavior(50), new LookAtBehavior());
        ent3.addBehaviors(new MoveBehavior(50));
        
        // ent3.transform.position[0] = 0;
        ent2.transform.position[1] = 100;

        this.addCamera(cam);
        this.setCurrentCamera("Cam");

        super.load();
    }
}
