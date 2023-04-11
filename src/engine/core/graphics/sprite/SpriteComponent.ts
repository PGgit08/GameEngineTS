import { Component } from "../../ecs/Component";
import { RendererManager } from "../../managers/RendererManager";
import { Sprite } from "./Sprite";

export class SpriteComponent extends Component {
    private _sprite: Sprite;

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

    public start(): void {}
    public update(): void {}

    public render(): void {
        this._sprite.render(
            this.parent.worldMatrix,
            RendererManager.getInstance().currentRenderer.projectionMat
        );
    }
}
