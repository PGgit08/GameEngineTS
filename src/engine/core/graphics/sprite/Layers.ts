import Dictionary from "../../../types/Dictionary";
import { GameObject } from "../../ecs/GameObject";
import { NameRegistrar } from "../../helpers/NameRegistrar";
import { SpriteComponent } from "./SpriteComponent";

import { Scene } from "../../ecs/Scene";

/**
 * @classdesc
 * A GameObject belonging to all {@link Scene} objects that layers {@link SpriteComponent} objects based on their layer name and their
 * order in the layer.
 * 
 * @class Layers
 * @extends GameObject
 */
export class Layers extends GameObject {
    // the game layers belonging to the whole game
    private static _gameLayersSet: boolean = false;
    private static _gameLayers: string[] = ["Default"];

    /**
     * Sets the names of the game layers for the game (CAN ONLY BE CALLED ONCE).
     * 
     * @static
     * 
     * @param {string[]} gameLayers - The game layers in this game (ORDER IS: CLOSEST TO CAMERA -> FURTHEST).
     */
    public static SetGameLayers(gameLayers: string[]): void {
        // TODO: check for duplicates
        if (this._gameLayersSet) throw new Error("Cannot modify game layer order after they were set.");
        if (!gameLayers.includes("Default")) throw new Error("Game layers must contain Default layer.");
        if (NameRegistrar.FindDuplicates(gameLayers)) throw new Error("Game layers have duplicate layer.");

        this._gameLayers = gameLayers;
        this._gameLayersSet = true;
    }

    /**
     * @static
     * 
     * @returns {string[]} The game layers in the game.
     */
    public static get gameLayers(): string[] {
        return this._gameLayers;
    }

    // EACH LAYER GETS DISPLAYED IN REVERSE
    private _layers: Dictionary<string, SpriteComponent[]> = {};
    private _counter: number = -1;

    constructor() {
        super("Layers");

        Layers._gameLayers.reverse().forEach((layerName) => {
            this._layers[layerName] = [];
        });
    }

    public e(): void {
        this._layers["Background"].forEach((f) => {
            console.log(f.parent.name)
        })
    }

    /**
     * @returns {SpriteComponent} Returns the next SpriteComponent in this Layers instance.
     */
    public next(): SpriteComponent {
        if (this._counter >= Object.values(this._layers).flat(1).length - 1) {
            this._counter = -1
        }
        
        this._counter ++;

        const displayed = Object.values(this._layers).flat(1).reverse()

        return displayed[this._counter];
    }

    /**
     * Sets the layer of a given SpriteComponent. If its layer order does not work, then the SpriteComponent is pushed
     * to the front of the layer.
     * 
     * @param {SpriteComponent} spriteComp - The given SpriteComponent.
     * @param {string} newLayer - The new layer of the SpriteComponent.
     */
    public setLayer(spriteComp: SpriteComponent, newLayer: string): void {
        if (!Object.keys(this._layers).includes(newLayer)) throw new Error("Layer does not exist.");

        if (this._layers[spriteComp.layer][spriteComp.layerOrder] === spriteComp) {
            // first remove this SpriteComponent from its old position
            this._layers[spriteComp.layer].splice(spriteComp.layerOrder, 1);
        }

        if (spriteComp.layerOrder < this._layers[newLayer].length) {
            // push into new layer with old layer order
            this._layers[newLayer].splice(spriteComp.layerOrder, 0, spriteComp);
        } else {
            // push into front of new layer
            this._layers[newLayer].splice(0, 0, spriteComp);
        }
    }

    /**
     * Sets the layer order of a given SpriteComponent. If its layer order does not work, then it is pushed to the start of its
     * layer.
     * 
     * @param {SpriteComponent} spriteComp - The given SpriteComponent.
     * @param {number} newLayerOrder - The new layer order of the SpriteComponent.
     */
    public setLayerOrder(spriteComp: SpriteComponent, newLayerOrder: number): void {
        if (newLayerOrder < 0) throw new Error("New layer order does not work.");

        if (this._layers[spriteComp.layer][spriteComp.layerOrder] === spriteComp) {
            // first remove this SpriteComponent from its old position
            this._layers[spriteComp.layer].splice(spriteComp.layerOrder, 1);
        }

        if (newLayerOrder < this._layers[spriteComp.layer].length) {
            // push into new layerOrder
            this._layers[spriteComp.layer].splice(spriteComp.layerOrder, 0, spriteComp);
        } else {
            // if layer order is too big, pushed to the front of the layer 
            this._layers[spriteComp.layer].splice(0, 0, spriteComp);
        }
    }

    /**
     * Removes a given SpriteComponent from this Layers object if it is found.
     * 
     * @param {SpriteComponent} spriteComp - The given SpriteComponent.
     */
    public remove(spriteComp: SpriteComponent): void {
        if (spriteComp.parentScene === null) return;

        const layer = spriteComp.layer;
        const layerOrder = spriteComp.layerOrder;

        if (this._layers[layer][layerOrder] === spriteComp) {
            this._layers[layer].splice(layerOrder, 1);
        }
    }
}
