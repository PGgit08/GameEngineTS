import { Behavior } from "../ecs/Behavior";
import { Vector2 } from "../math/Vector2";

export class SampleBehavior extends Behavior {
    constructor() {
        super("SampleBehavior");
    }
    
    public start(): void {
        // console.log("SampleBehavior Start!");
        this.parent.transform.translate(new Vector2(100, 100));
        this.parent.transform.rotate(50);
    }

    public update(): void {
        // console.log("SampleBehavior Update!");
    }
}