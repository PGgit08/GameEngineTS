import { Component } from "../../ecs/Component";
import { Scene } from "../../ecs/Scene";
import { Events } from "../../events/Events";
import { RendererManager } from "../../managers/RendererManager";
import { SceneManager } from "../../managers/SceneManager";
import { Sprite } from "./Sprite";

export class SpriteComponent extends Component {
    private _sprite: Sprite;
    
    private _layer: string = "Default";
    private _layerOrder: number = 0;

    public get sprite(): Sprite {
        return this._sprite;
    }

    public get layer(): string {
        return this._layer;
    }

    public set layer(layer: string) {
        /**
         * IF this.parentScene not null THEN set layer in SCENE
         * IF this.parentScene null THEN set layer LOCALLY
         */

        this._layer = layer;
    }

    public get layerOrder(): number {
        return this._layerOrder;
    }

    public set layerOrder(layerOrder: number) {
        /**
         * IF this.parentScene not null THEN set layerOrder in SCENE
         * IF this.parentScene null THEN set layerOrder LOCALLY
         */
        
        this._layerOrder = layerOrder;
    }


    constructor(sprite: Sprite) {
        super("SpriteComponent");

        this.eventEmmiter.subscribeTo<Scene[]>(Events.PARENT_SCENE_CHANGE, (eventData) => {
            /**
             * WHAT TO ADD HERE:
             * 
             * - Remove SpriteComponent from old parentScene.
             * - Add SpriteComponent to new parentScene.
             * 
             * THAT'S IT!!
             */
        });

        this._sprite = sprite;
    }

    public load(): void {
        this._sprite.load();
    }

    public override start(): void {}
    public override update(): void {}

    public override render(): void {
        this._sprite.render(
            this.parent.transform.toWorldMat(),
            RendererManager.getInstance().currentRenderer.projectionMat,
            SceneManager.getInstance().currentScene.currentCamera.view()
        );
    }
}
