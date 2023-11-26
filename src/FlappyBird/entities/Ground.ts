import { Entity, Poolable, Sprite, SpriteComponent } from "../../engine/GETS";
import { GroundBehavior } from "../behaviors/GroundBehavior";

export class Ground extends Entity implements Poolable {
    private _active: boolean = false;

    set active(actv: boolean) {
        this.enabled = actv;
    }

    get active(): boolean {
        return this._active
    }

    constructor() {
        super("Ground");

        this.enabled = false;
        
        this.transform.position[0] = 10;

        this.addComponents(
            new GroundBehavior(),
            new SpriteComponent(new Sprite())
        )
    }
}
