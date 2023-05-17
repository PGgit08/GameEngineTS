import { Component } from "../../ecs/Component";
import { RendererManager } from "../../managers/RendererManager";
import { SceneManager } from "../../managers/SceneManager";
import { Sprite } from "./Sprite";

export class SpriteComponent extends Component {
    private _sprite: Sprite;
    public visible: boolean = true;
    
    public get sprite(): Sprite {
        return this._sprite;
    }

    constructor(sprite: Sprite) {
        super("SpriteComponent");

        this._sprite = sprite;
    }

    public load(): void {
        this._sprite.load();
    }

    public override start(): void {}
    public override update(): void {}

    public override render(): void {
        if (this.visible) {
            this._sprite.render(
                this.parent.worldMatrix,
                RendererManager.getInstance().currentRenderer.projectionMat,
                SceneManager.getInstance().currentScene.currentCamera.view()
            );
        }
    }
}
