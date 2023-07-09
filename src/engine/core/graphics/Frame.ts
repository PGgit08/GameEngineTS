import { GameObject } from "../ecs/GameObject";

import { Texture } from "./Texture";

/**
 * @classdesc
 * A GameObject representing an individual "frame" of a {@link Texture} object.
 * 
 * @class Frame
 * @extends GameObject
 * 
 * @param {number} x - The X position of this Frame in the Texture in pixels.
 * @param {number} y - The Y position of this Frame in the Texture in pixels.
 * @param {number} w - The width of this Frame in the Texture in pixels.
 * @param {number} h - The height of this Frame in the Texture in pixels.
 */
export class Frame extends GameObject {
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    private _minTexX: number = 0;
    private _minTexY: number = 0;
    private _maxTexX: number;
    private _maxTexY: number;

    /**
     * @returns {number} The top left corner X coord of this Frame in its Texture (in WebGL coordinates).
     */
    public get minTexX(): number {
        return this._minTexX;
    }

    /**
     * @returns {number} The top left corner Y coord of this Frame in its Texture (in WebGL coordinates).
     */
    public get minTexY(): number {
        return this._minTexY;
    }

    /**
     * @returns {number} The bottom right corner X coord of this Frame in its Texture (in WebGL coordinates).
     */
    public get maxTexX(): number {
        return this._maxTexX;
    }

    /**
     * @returns {number} The bottom right corner Y coord of this Frame in its Texture (in WebGL coordinates).
     */
    public get maxTexY(): number {
        return this._maxTexY;
    }

    /**
     * Creates a new Frame that completely fills up a 1x1 texture.
     * 
     * @static 
     * 
     * @returns {Frame} A default Frame.
     */
    public static DefaultFrame(): Frame {
        const defaultFrame: Frame = new Frame("DEFAULT_FRAME", 0, 0, 1, 1);
        defaultFrame.calcTexCoords(1, 1);

        return defaultFrame;
    }

    constructor(name: string, x: number, y: number, w: number, h: number) {
        super(name);
        
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }

    /**
     * Calculates the WebGL texture coordinates of this Frame.
     * 
     * @param {number} texW - The width of the Texture that this Frame belongs to.
     * @param {number} texH - The height of the Texture that this Frame belongs to.
     */
    public calcTexCoords(texW: number, texH: number): void {
        if (this.x !== 0) {
            this._minTexX = this.x / texW;
        }

        if (this.y !== 0) {
            this._minTexY = this.y / texH;
        }

        this._maxTexX = (this.x + this.width) / texW;
        this._maxTexY = (this.y + this.height) / texH; 
    }
}
