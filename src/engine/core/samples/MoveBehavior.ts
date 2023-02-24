import { Behavior } from "../ecs/Behavior";
import { Vector2 } from "../math/Vector2";

export class MoveBehavior extends Behavior {
    constructor() {
        super("MoveBehavior");
    }
    
    public start(): void {
        // console.log("SampleBehavior Start!");
    }

    public update(): void {
        // console.log("SampleBehavior Update!");
        this.transform.translate(new Vector2(1, 0));
    }
}