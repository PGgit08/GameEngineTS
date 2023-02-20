import { GameObject } from "../ecs/GameObject";
import { Lifecycle } from "../Lifecycle";
import { RendererManager } from "../managers/RendererManager";

/**
 * A view that can be rendered on and chosen by the RenderManager
 */
export class Renderer extends GameObject implements Lifecycle {
    private _width: number;
    private _height: number;

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

    constructor(name: string, canvasId?: string){
        super(name);

        if (canvasId != undefined) {
            this._canvasId = canvasId;

            this.fromCanvas();
        }

        if (canvasId == undefined) {
            this._width = 800;
            this._height = 600;

            this.createCanvas();
        }

        this._canvasId = this._canvas.id;
        this._gl = this._canvas.getContext("webgl") as WebGLRenderingContext;

        this._gl.clearColor(0.0, 0.0, 0.0, 1.0); // Set clear color to black, fully opaque
        this._gl.clear(this._gl.COLOR_BUFFER_BIT);
        this._gl.viewport(0, 0, this._width, this._height);
        this._gl.enable(this._gl.DEPTH_TEST);

        RendererManager.getInstance().addRenderer(this);
    }

    /**
     * Build this Renderer if a canvas is supplied
     */
    private fromCanvas(): void {
        this._canvas = document.getElementById(this._canvasId) as HTMLCanvasElement;

        this._width = this._canvas.width;
        this._height = this._canvas.height;
    }

    /**
     * Build this Renderer if there is no canvas supplied
     */
    private createCanvas(): void {
        this._canvas = document.createElement("canvas") as HTMLCanvasElement;

        this._canvas.id = this.id;

        this._canvas.width = this._width;
        this._canvas.height = this._height;

        this._canvas.style.border = "thick solid #0000FF"; 

        document.body.appendChild(this._canvas);
    }

    public start(): void {
        // console.log("Renderer Start");
    }

    public update(): void {
        // console.log("Renderer Update");
    }

    public render(): void {
        // console.log("Renderer Render");
    }
}
