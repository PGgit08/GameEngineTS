import Dictionary from "../../extra/Dictionary";
import { TexturePackerConfig, TexturePackerFrame } from "../../extra/TexturePackerConfig";
import { GameObject } from "../ecs/GameObject";
import { TextureManager } from "../managers/TextureManager";
import { isPowerOf2 } from "../math/Utils";
import { Frame } from "./Frame";

/**
 * Represents a WebGL Texture.
 */
export class Texture extends GameObject {
    private _fileName: string;
    private _texture: WebGLTexture;

    private _frames: Dictionary<string, Frame> = {};

    public get fileName(): string {
        return this._fileName;
    }

    public get texture(): WebGLTexture {
        return this._texture;
    }

    /**
     * Creates a new Texture.
     * @param name The GameObject name of this Texture.
     * @param fileName The file path of this Texture (IF NOTHING SUPPLIED, TEXTURE DEFAULTS TO WHITE PIXEL).
     * @param texturePackerConfig The JSON containing the Texture packing config of this Texture
     * (IF NOTHING SUPPLIED, DEFAULT FRAME TAKING UP WHOLE TEXTURE IS CREATED AND USED).
     */
    constructor(name: string, fileName?: string, texturePackerConfig?: TexturePackerConfig) {
        super(name);

        this._fileName = fileName;

        if (texturePackerConfig !== undefined) {
            texturePackerConfig.frames.forEach((frame: TexturePackerFrame) => {
                const newFrame: Frame = new Frame(
                    frame.frame.x,
                    frame.frame.y,
                    frame.frame.w,
                    frame.frame.h
                );

                newFrame.calcTexCoords(texturePackerConfig.meta.size.h, texturePackerConfig.meta.size.h);
                
                this._frames[frame.filename.split(".")[0]] = newFrame;
            });
        }

        // config default frame to take up whole texture
        this._frames['DEFAULT_FRAME'] = Frame.defaultFrame();

        TextureManager.getInstance().addTexture(this);
    }


    /**
     * Returns the default Frame of this Texture.
     */
    public getDefaultFrame(): Frame {
        return this.getFrame('DEFAULT_FRAME');
    }

    /**
     * Returns a Frame from this Texture.
     * @param frameName The name of the the Frame.
     */
    public getFrame(frameName: string): Frame {
        if (this._frames[frameName] !== undefined) {
            return this._frames[frameName];
        } else {
            return this.getDefaultFrame();
        }
    }

    /**
     * Loads this Texture from the Image.
     */
    public load(): void {
        this._texture = gl.createTexture();

        this.bind();

        if (this._fileName !== undefined) {
            this.loadImage();
        } else {
            // set image to WHITE if nothing supplied
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 255]));
        }
    }

    // loads texture from image
    private loadImage(): void {
        // default image to WHITE 1x1 pixel
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 255]));

        const img = new Image();
        img.src = this._fileName;
        
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

            this._frames['DEFAULT_FRAME'].width = img.width;
            this._frames['DEFAULT_FRAME'].height = img.height;
            this._frames['DEFAULT_FRAME'].calcTexCoords(img.width, img.height);
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
