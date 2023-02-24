import { Behavior } from "../ecs/Behavior";
import { Vector2 } from "../math/Vector2";

export class SampleBehavior extends Behavior {
    constructor() {
        super("SampleBehavior");
    }
    
    public start(): void {
        // console.log("SampleBehavior Start!");
        this.transform.position = new Vector2(100, 100);
        // this.transform.rotation = 50;
    }

    public update(): void {
        // console.log("SampleBehavior Update!");
        // this.transform.translate(new Vector2(10, 0));
        // this.parent.transform.scale.x += 0.1;
        // this.transform.rotate(5);
    }
}