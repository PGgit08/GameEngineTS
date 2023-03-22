import { isPowerOf2 } from "../math/Utils";

/**
 * Represents a WebGL Texture.
 */
export class Texture {
    private _name: string;
    private _fileName: string;

    private _texture: WebGLTexture;

    public get name(): string {
        return this._name
    }

    public get fileName(): string {
        return this._fileName;
    }

    public get texture(): WebGLTexture {
        return this._texture;
    }

    constructor(fileName: string) {
        this._name = '';
        this._fileName = fileName;

        this.load();
    }

    /**
     * Loads this Texture from the Image.
     */
    public load(): void {
        this._texture = gl.createTexture();

        this.bind();

        // default image to blue pixel
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));

        const img = new Image();
        img.src = this.fileName;
        
        img.onload = () => {
            this.bind();
            
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);

            if (isPowerOf2(img.width) && isPowerOf2(img.height)) {
                gl.generateMipmap(gl.TEXTURE_2D); // MIPMAP defaults: probably NEAREST_MIPMAP_LINEAR small, LINEAR big
            } else {
                // first clamp when not power of two (so tex coordinates end at 1.0)
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

                // this MIPMAP filter used when rendering image small (create LINEAR mipmaps from original tex as largest mip)
                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            }
        }

        img.onerror = () => {
            throw new Error("Unable to load Texture image.");
        }
    }

    /**
     * Activate the texture to it's unit and bind it.
     */
    public activateAndBind() {
        gl.activeTexture(gl.TEXTURE0);

        this.bind();
    }

    /**
     * Binds the texture.
     */
    public bind(): void {
        // this binds the texture to the unit (called in activateAndBind())
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
    }

    /**
     * Unbinds the texture.
     */
    public unbind(): void {
        gl.bindTexture(gl.TEXTURE_2D, undefined);
    }
}
