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
    }

    /**
     * Loads this Texture from the Image.
     */
    public load(): void {
        this.loadImage().then(
            (img) => {
                gl.bindTexture(gl.TEXTURE_2D, this._texture);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA,gl.UNSIGNED_BYTE, img);
                gl.generateMipmap(gl.TEXTURE_2D);
            }
        ).catch(
            () => { throw new Error("Unable to load Texture image.") }
        );
    }

    private loadImage(): Promise<HTMLImageElement> {
        return new Promise((resolve, reject) => {
            const img = new Image();
            
            img.src = this._fileName;
            
            img.onload = () => resolve(img);
            img.onerror = reject;
        });
    }
}
