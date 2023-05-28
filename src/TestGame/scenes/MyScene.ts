import { Entity, MoveBehavior, Scene, DefaultEntity } from "../../engine/GETS";

export class MyScene extends Scene {
    constructor() {
        super("MyScene");
    }

    // experimenting with LOAD placement
    public override load(): void {
        const entity1 = Entity.Spawn(DefaultEntity);
        const entity2 = Entity.Spawn(DefaultEntity);

        entity2.transform.position[0] = 200;

        entity1.addChildren(entity2);
        entity1.addBehaviors(new MoveBehavior());
        
        this.addEntities(entity1);

        setTimeout(() => {
            console.log(entity2.transform.parentRotation);
        }, 5000);

        super.load();
    }
}
