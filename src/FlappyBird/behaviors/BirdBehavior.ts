import { Behavior, Pool, SpriteComponent } from "../../engine/GETS";
import { Ground } from "../entities/Ground";

export class BirdBehavior extends Behavior {
    private _groundPool: Pool<Ground> = new Pool("GroundPool");
    private _currGround: Ground;

    constructor() {
        super("BirdBehavior");
    }

    public override load(): void {
        this.parent.getComponent(SpriteComponent).sprite.visible = false;

        // the grounds for the pool
        let grounds = [
            new Ground(),
            new Ground()
        ]

        this._groundPool.resetPool(grounds);
        // this.parentScene.addEntities(...grounds);

        const tGround = new Ground();

        tGround.enabled = true;
        this.parentScene.addEntities(tGround);
    }

    public override update(): void {
    }
}