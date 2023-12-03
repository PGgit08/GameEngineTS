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
     * Checks whether a given layer exists in the game's layers.
     * 
     * @static
     * 
     * @param {string} layer - The layer to check.
     * @returns {boolean} True if the layer is found, False if not.
     */
    public static CheckLayer(layer: string): boolean {
        return this._gameLayers.includes(layer);
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

        Layers._gameLayers.forEach((layerName) => {
            this._layers[layerName] = [];
        });
    }


    /**
     * @returns {SpriteComponent} Returns the next SpriteComponent in this Layers instance.
     */
    public next(): SpriteComponent {
        if (this._counter >= Object.values(this._layers).flat(1).length - 1) {
            this._counter = -1
        }
        
        this._counter ++;

        const reversed = Object.values(this._layers).flat(1).reverse();

        return reversed[this._counter];
    }

    /**
     * Sets the layer of a given SpriteComponent. If its layer order does not work, then the SpriteComponent is pushed
     * to the front of the layer.
     * 
     * @param {SpriteComponent} spriteComp - The given SpriteComponent.
     * @param {string} newLayer - The new layer of the SpriteComponent. (MUST BE A VALID LAYER, CHECK WITH {@link Layers.CheckLayer})
     */
    public setLayer(spriteComp: SpriteComponent, newLayer: string): void {
        this.remove(spriteComp);

        this._layers[newLayer].splice(spriteComp.layerOrder, 0, spriteComp);
    }

    /**
     * Sets the layer order of a given SpriteComponent. If its layer order does not work, then it is pushed to the start of its
     * layer.
     * 
     * @param {SpriteComponent} spriteComp - The given SpriteComponent.
     * @param {number} newLayerOrder - The new layer order of the SpriteComponent. (MUST BE A VALID LAYER ORDER, MUST BE > 0)
     */
    public setLayerOrder(spriteComp: SpriteComponent, newLayerOrder: number): void {
        this.remove(spriteComp);

        this._layers[spriteComp.layer].splice(newLayerOrder, 0, spriteComp);
    }

    /**
     * Removes a given SpriteComponent from this Layers object if it is found.
     * 
     * @param {SpriteComponent} spriteComp - The given SpriteComponent.
     */
    public remove(spriteComp: SpriteComponent): void {
        if (this._layers[spriteComp.layer].indexOf(spriteComp) > -1) {
            // remove this SpriteComponent from its old position (IF FOUND)
            this._layers[spriteComp.layer].splice(this._layers[spriteComp.layer].indexOf(spriteComp), 1);
        }
    }
}
