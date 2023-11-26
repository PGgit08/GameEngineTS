import { Color, Entity, Poolable, Sprite, SpriteComponent } from "../../engine/GETS";

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

        this.transform.position[0] = 30;

        this.enabled = false;

        const spriteComponent = new SpriteComponent(new Sprite());

        spriteComponent.sprite.material.color = Color.GREEN;
        spriteComponent.layer = "Background";
        spriteComponent.layerOrder = 0;

        this.addComponents(
            spriteComponent
        )
    }
}
