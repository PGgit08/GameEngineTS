import { Behavior } from "../ecs/Behavior";

export class SampleBehavior extends Behavior {
    constructor() {
        super("SampleBehavior");
    }

    public load(): void {
        
    }

    public start(): void {
        // console.log("SampleBehavior Start!");
    }

    public update(): void {
        // console.log("SampleBehavior Update!");
    }
}