import { vec2 } from "gl-matrix";
import { Entity, MoveBehavior, Scene, Mesh, MeshComponent, Square, Texture, StandardMaterial} from "../../engine/GETS";
import imgUrl from '../assets/emoji.jpg';

export class MyScene extends Scene {
    constructor() {
        super("MyScene");

        const entity1: Entity = new Entity("Entity1");
        const entity2: Entity = new Entity("Entity2");

        entity1.addComponents(new MeshComponent(new Mesh(new Square(), new StandardMaterial(new Texture('', imgUrl)))));
        // entity2.addComponents(new MeshComponent(new Mesh(new Square(), new ColorMaterial())));

        // entity1.addBehaviors(new MoveBehavior());

        entity1.transform.position = vec2.fromValues(300, 300);
        entity1.transform.scale = vec2.fromValues(1.3, 1.3);
        // entity2.transform.position = vec2.fromValues(100, 200);

        entity1.addChildren(entity2);

        this.addEntities(entity1);
    }
}
