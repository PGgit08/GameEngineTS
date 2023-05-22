import { vec2 } from "gl-matrix";
import { Behavior } from "../ecs/Behavior";
import { SceneManager } from "../managers/SceneManager";

export class NoZoomBehavior extends Behavior {
    /**
     * Prevents Camera zoom-in/zoom-out to act upon the Entity by updating its scale value.
     */
    constructor() {
        super("NoZoomBehavior");
    }

    public override start(): void {}

    public override update(): void {
        this.transform.scale = vec2.fromValues(
            SceneManager.getInstance().currentScene.currentCamera.camToCanvasRatio[0] * this.parent.transform.scale[0],
            SceneManager.getInstance().currentScene.currentCamera.camToCanvasRatio[1] * this.parent.transform.scale[1]
        );
    }
}