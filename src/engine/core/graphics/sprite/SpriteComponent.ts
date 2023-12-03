import { Component } from "../../ecs/Component";
import { Scene } from "../../ecs/Scene";
import { Events } from "../../events/Events";
import { RendererManager } from "../../managers/RendererManager";
import { SceneManager } from "../../managers/SceneManager";
import { Sprite } from "./Sprite";

import { Layers } from "./Layers";
import { Camera } from "../Camera";

/**
 * @classdesc
 * A {@link Component} that is used to render a {@link Sprite} for an {@link Entity}.
 * 
 * @class SpriteComponent
 * @extends Component
 * 
 * @param {Sprite} sprite - The Sprite object this Component will render.
 */
export class SpriteComponent extends Component {
    private _sprite: Sprite;
    
    private _layer: string = "Default";
    private _layerOrder: number = 0;

    /** @returns {Sprite} The Sprite this Component is rendering. */
    public get sprite(): Sprite {
        return this._sprite;
    }

    public set layer(layer: string) {
        if (!Layers.CheckLayer(layer)) throw new Error(`LAYER "${layer}" DOES NOT EXIST`);

        if (this.parentScene !== null) {
            this.parentScene.layers.setLayer(this, layer);
        }

        this._layer = layer;
    }
    
    /** @returns {string} The layer of this SpriteComponent in the {@link Layers} object. */
    public get layer(): string {
        return this._layer;
    }

    public set layerOrder(layerOrder: number) {
        if (layerOrder < 0) throw new Error(`LAYER ORDER MUST BE GREATER THAN / EQUAL TO 0`);

        if (this.parentScene !== null) {
            this.parentScene.layers.setLayerOrder(this, layerOrder);
        }

        this._layerOrder = layerOrder;
    }

    /**
     * @returns {number} The layerOrder of this SpriteComponent in the {@link Layers} object (order 0 -> Closest to {@link Camera}).
     */
    public get layerOrder(): number {
        return this._layerOrder;
    }

    constructor(sprite: Sprite) {
        super("SpriteComponent");

        this.eventEmmiter.subscribe<Scene[]>(Events.PARENT_SCENE_CHANGE, (eventData) => {    
            this.layer = this._layer; 

            if (eventData.data[0] !== null) eventData.data[0].layers.remove(this);
        });

        this._sprite = sprite;
    }

    private toDraw(): SpriteComponent {
        const to_draw: SpriteComponent = this.parentScene.layers.next(); 

        if (!to_draw.parent.enabled) {
            return this.toDraw();
        }

        else {
            return to_draw;
        }
    } 

    /**
     * Draws the Sprite belonging to this SpriteComponent.
     */
    public draw(): void {
        this._sprite.draw(
            this.parent.transform.toWorldMat(),
            RendererManager.getInstance().currentRenderer.projectionMat,
            SceneManager.getInstance().currentScene.currentCamera.view()
        );
    }

    public load(): void {
        this._sprite.load();
    }

    public override update(): void {}

    public override render(): void {
        this.toDraw().draw();
    }

    public unload(): void {
        this._sprite.unload();
    }
}
