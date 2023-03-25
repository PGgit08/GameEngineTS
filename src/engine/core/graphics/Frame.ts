export class Frame {
    public x: number;
    public y: number;
    public width: number;
    public height: number;

    private _minTexX: number = 0;
    private _minTexY: number = 0;
    private _maxTexX: number;
    private _maxTexY: number;

    /**
     * The top left corner X coord of this Frame in its Texture (in WebGL coordinates).
     */
    public get minTexX(): number {
        return this._minTexX;
    }

    /**
     * The top left corner Y coord of this Frame in its Texture (in WebGL coordinates).
     */
    public get minTexY(): number {
        return this._minTexY;
    }

    /**
     * The bottom right corner X coord of this Frame in its Texture (in WebGL coordinates).
     */
    public get maxTexX(): number {
        return this._maxTexX;
    }

    /**
     * The bottom right corner Y coord of this Frame in its Texture (in WebGL coordinates).
     */
    public get maxTexY(): number {
        return this._maxTexY;
    }

    /**
     * Represents individual "frames" of a Texture that can be useful for both Texture Atlases,
     * and Sprite Sheets (similar design to PhaserJS).
     * @param x The X position of this Frame in the Texture in pixels.
     * @param y The Y position of this Frame in the Texture in pixels.
     * @param w The width this Frame in the Texture in pixels.
     * @param h The height of this Frame in the Texture in pixels.
     */
    constructor(x: number, y: number, w: number, h: number) {
        this.x = x;
        this.y = y;
        this.width = w;
        this.height = h;
    }

    /**
     * Calculates the WebGL texture coordinates of this Frame.
     * @param texW The width of the Texture that this Frame belongs to.
     * @param texH The height of the Texture that this Frame belongs to.
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
