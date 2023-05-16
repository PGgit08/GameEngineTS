import { GameObject } from "../ecs/GameObject";
import { Lifecycle } from "../Lifecycle";
import { RendererManager } from "../managers/RendererManager";
import { mat3 } from "gl-matrix";

/**
 * A view that can be rendered on and chosen by the RenderManager
 */
export class Renderer extends GameObject implements Lifecycle {
    private _width: number;
    private _height: number;

    private _projectionMat: mat3;

    private _canvas: HTMLCanvasElement;
    private _canvasId: string;

    private _gl: WebGLRenderingContext;

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    get canvasId(): string {
        return this._canvasId;
    }

    get canvas(): HTMLCanvasElement {
        return this._canvas;
    }

    get gl(): WebGLRenderingContext {
        return this._gl;
    }

    get projectionMat(): mat3 {
        return this._projectionMat;
    }

    constructor(name: string, canvasId: string){
        super(name);

        this._canvasId = canvasId;

        RendererManager.getInstance().addRenderer(this);
    }

    /**
     * Build this Renderer from a supplied canvas.
     */
    private fromCanvas(): void {
        this._canvas = document.getElementById(this._canvasId) as HTMLCanvasElement;

        this._width = this._canvas.width;
        this._height = this._canvas.height;

        this._canvas.style.width = this._canvas.width.toString();
        this._canvas.style.height = this._canvas.height.toString();
    }

    /**
     * A method that creates a 600x800 Canvas Element and add it to the DOM.
     * @returns The Canvas.
     */
    public static createCanvas(id: string): HTMLCanvasElement {
        const canvas: HTMLCanvasElement = document.createElement("canvas") as HTMLCanvasElement;

        canvas.id = id;

        canvas.width = 800;
        canvas.height = 600;

        canvas.style.border = "thick solid #0000FF"; 

        canvas.style.width = canvas.width.toString();
        canvas.style.height = canvas.height.toString();

        document.body.appendChild(canvas);

        return canvas;
    }

    public load(): void {
        this.fromCanvas();
    
        this._gl = this._canvas.getContext("webgl") as WebGLRenderingContext;

        if (this._gl === undefined) {
            throw new Error("Browser does not support WebGL");
        }

        this._projectionMat = mat3.fromValues(
            2 / this._width, 0, 0, // column 1 (scale X by 2/width, translate by -1)
            0, -2 / this._height, 0, // column 2 (scale Y by 2/height translate by 1)
            -1, 1, 1 // column 3 (NONE)
        );

        this._gl.clearColor(0.0, 0.0, 0.0, 0.0); // Set to white with transparent background
        this._gl.clear(this._gl.COLOR_BUFFER_BIT);
        this._gl.viewport(0, 0, this._gl.canvas.width, this._gl.canvas.height);
    }

    public start(): void {
        // console.log("Renderer Start");
    }

    public update(): void {
        // console.log("Renderer Update");
    }

    public render(): void {
        // console.log("Renderer Render");
        this._gl.clear(this._gl.COLOR_BUFFER_BIT);
    }
}
