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

    constructor(name: string, fileName: string) {
        this._name = name;
        this._fileName = fileName;
        


        this.load();
    }

    /**
     * Loads this Texture from the Image.
     */
    public load(): void {
        this._texture = gl.createTexture();

        gl.bindTexture(gl.TEXTURE_2D, this._texture);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
        
        const img = new Image();
        
        img.src = this.fileName;
        
        img.onload = () => {
            gl.bindTexture(gl.TEXTURE_2D, this._texture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
            // gl.generateMipmap(gl.TEXTURE_2D);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);

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
