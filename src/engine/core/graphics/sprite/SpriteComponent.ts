import Dictionary from "../../../extra/Dictionary";
import { Component } from "../../ecs/Component";
import { RendererManager } from "../../managers/RendererManager";
import { SceneManager } from "../../managers/SceneManager";
import { Sprite } from "./Sprite";

export class SpriteComponent extends Component {
    private _sprite: Sprite;
    public visible: boolean = true;
    
    private _layer: string;
    private _layerOrder: number;

    private static _layers: Dictionary<string, Sprite[]> = {
        "Default": []
    };

    public set layer(layer: string) {
        if (this.owner.parentScene !== SceneManager.getInstance().currentScene) {
            return;
        }

        // Removes the Sprite from its current layer at its current order
        SpriteComponent._layers[this._layer].splice(this._layerOrder, 1);

        if (this._layerOrder < SpriteComponent._layers[layer].length) {
            // if the current layer order works for the new layer, use it
            SpriteComponent._layers[layer].splice(this._layerOrder, 0, this._sprite);
        } else {
            // if the current layer order does not work for the new layer, push it to the end of the new layer
            SpriteComponent._layers[layer].push(this._sprite);
            this._layerOrder = SpriteComponent._layers[layer].length - 1;
        }

        this._layer = layer;
    }

    public set layerOrder(layerOrder: number) {
        if (this.owner.parentScene !== SceneManager.getInstance().currentScene) {
            return;
        }

        if (layerOrder < SpriteComponent._layers[this._layer].length) {
            // if the new layer order works for the current layer, use it
            SpriteComponent._layers[this._layer].splice(layerOrder, 0, this._sprite);
            this._layerOrder = layerOrder;
        }
    }

    public get layer(): string {
        return this._layer;
    }

    public get layerOrder(): number {
        return this._layerOrder;
    }

    public get sprite(): Sprite {
        return this._sprite;
    }

    constructor(sprite: Sprite) {
        super("SpriteComponent");

        this._sprite = sprite;
        this._layer = "Default";
    }

    public load(): void {
        this._sprite.load();
    }

    public override start(): void {}
    public override update(): void {}

    public override render(): void {
        if (this.visible) {
            this._sprite.render(
                this.owner.transform.toWorldMat(),
                RendererManager.getInstance().currentRenderer.projectionMat,
                SceneManager.getInstance().currentScene.currentCamera.view()
            );
        }
    }
}
