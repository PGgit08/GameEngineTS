import { Behavior, RendererManager, Time } from "../../engine/GETS";

export class BackgroundBehavior extends Behavior {
    constructor() {
        super("BackgroundBehavior");
    }

    public override update(): void {
        const screenWidth: number = RendererManager.getInstance().currentRenderer.width;

        if (this.transform.position[0] <= -screenWidth) {
            this.transform.position[0] += 2 * screenWidth;
        }

        this.transform.position[0] -= 150 * Time.DeltaTime();
    }
}
