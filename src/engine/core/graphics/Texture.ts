import Dictionary from "../../types/Dictionary";
import { TexturePackerConfig, TexturePackerFrame } from "../config/TexturePackerConfig";
import { NameRegistrar } from "../helpers/NameRegistrar";
import { TextureManager } from "../managers/TextureManager";
import { isPowerOf2 } from "../math/Utils";
import { Frame } from "./Frame";

import { Material } from "./material/Material";

/**
 * @classdesc
 * A NameRegistrar that represents a WebGL texture. Is used in any {@link Material} object. When created it is automatically added into the
 * {@link TextureManager}. This Texture is made up of {@link Frame} objects with coordinates and dimensions that 
 * represent different "frames" of the texture. Each Texture has a default frame taking up the whole texture, but additional frames can be
 * added through a {@link TexturePackerConfig}.
 * 
 * @class Texture
 * @extends NameRegistrar
 * 
 * @param {string} name - The name of this Texture.
 * @param {string} [fileName] - The name of the file of this Texture (IF NOTHING SUPPLIED, DEFAULT WHITE TEXTURE IS USED).
 * @param {TexturePackerConfig} [texturePackerConfig] - The {@link Frame} config for this Texture, if nothing is supplied, only default Frame
 * taking up whole Texture is created.
 */
export class Texture extends NameRegistrar {
    private _fileName: string;
    private _texture: WebGLTexture;

    private _frames: Dictionary<string, Frame> = {};

    private _loaded: boolean = false;

    /** @returns {string} The name of the file that is used by this Texture. */
    public get fileName(): string {
        return this._fileName;
    }

    /** @returns {WebGLTexture} The WebGL texture object that belongs to this Texture. */
    public get texture(): WebGLTexture {
        return this._texture;
    }

    constructor(name: string, fileName?: string, texturePackerConfig?: TexturePackerConfig) {
        super(name);

        this._fileName = fileName;

        if (texturePackerConfig !== undefined) {
            texturePackerConfig.frames.forEach((frame: TexturePackerFrame) => {
                const newFrame: Frame = new Frame(
                    frame.filename.split(".")[0],
                    frame.frame.x,
                    frame.frame.y,
                    frame.frame.w,
                    frame.frame.h
                );

                newFrame.calcTexCoords(texturePackerConfig.meta.size.w, texturePackerConfig.meta.size.h);
                
                this.registerName(newFrame.name);
                this._frames[newFrame.name] = newFrame;
            });
        }

        // config default frame to take up whole texture
        this._frames['DEFAULT_FRAME'] = Frame.DefaultFrame();

        TextureManager.getInstance().addTexture(this);
    }

    // loads texture from image
    private loadImage(): void {
        // default image to BLACK 1x1 pixel
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 0, 255]));

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
     * @returns {Frame} Returns the default Frame of this Texture.
     */
    public getDefaultFrame(): Frame {
        return this.getFrame('DEFAULT_FRAME');
    }

    /**
     * Returns a Frame from this Texture.
     * 
     * @param {string} frameName - The name of the the Frame.
     * 
     * @returns {Frame} The Frame. If it does not exist, the default Frame is returned.
     */
    public getFrame(frameName: string): Frame {
        if (this._frames[frameName] !== undefined) {
            return this._frames[frameName];
        } else {
            return this.getDefaultFrame();
        }
    }

    /**
     * @returns {string[]} Returns the names of the Frames this Texture contains (DEFAULT Frame not counted).
     */
    public frameNames(): string[] {
        return Object.keys(this._frames).filter((name) => name != "DEFAULT_FRAME");
    }

    /**
     * Loads this Texture. Should be called ONCE.
     */
    public load(): void {
        if (this._loaded) return;

        this._texture = gl.createTexture();

        this.bind();

        if (this._fileName !== undefined) {
            this.loadImage();
        } else {
            // set image to WHITE if nothing supplied
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([255, 255, 255, 255]));
        }

        this._loaded = true;
    }

    /**
     * Activates this Texture to it's unit and binds it.
     */
    public activateAndBind() {
        gl.activeTexture(gl.TEXTURE0);

        this.bind();
    }

    /**
     * Binds this Texture.
     */
    public bind(): void {
        // this binds the texture to the unit (called in activateAndBind())
        gl.bindTexture(gl.TEXTURE_2D, this._texture);
    }

    /**
     * Unbinds this Texture.
     */
    public unbind(): void {
        gl.bindTexture(gl.TEXTURE_2D, undefined);
    }
}
