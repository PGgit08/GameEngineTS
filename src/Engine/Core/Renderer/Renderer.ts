import { GLMatrix4 } from "@gl/GLMatrix4";
import { SceneManager } from "@scenes/SceneManager";

/**
 * A full Renderer for the game.
 */
export class Renderer {
    // view matrix and projection matrix
    public static ViewMatrix: GLMatrix4 = GLMatrix4.identity();
    public static ProjectionMatrix: GLMatrix4;

    // screen width and screen height
    public static Width: number;
    public static Height: number;

    // WebGL related variables
    private _gl: WebGLRenderingContext;

    // Canvas related variables
    private static _canvasId: string;
    private static _viewport: HTMLCanvasElement;

    /**
     * @property The time between the start of the current frame and the start of the next frame 
     * Mutiply by this for pixel-per-second (pph) speed
    */
    public static DeltaTime: number = 0;

    public static get CanvasId(): string {
        return Renderer._canvasId;
    };

    public static get Viewport(): HTMLCanvasElement {
        return Renderer._viewport;
    };

    /**
     * Creates a new Render View.
     * @param width Width of Viewport.
     * @param height Height of Viewport.
     * @param canvasId HTML ID of canvas( default: "gCanvas" ).
     */
    constructor(width: number, height: number, canvasId: string="gCanvas"){
        Renderer.Width = width;
        Renderer.Height = height;

        Renderer._canvasId = canvasId;

        Renderer.ProjectionMatrix = GLMatrix4.projection(Renderer.Width, Renderer.Height);

        this.createCanvas();
    };

    // creates a new HTML canvas
    private createCanvas(): void {
        const searchElement = document.getElementById(Renderer._canvasId);

        if(searchElement) {
            console.log(searchElement);
        }
        else {
            // no canvas has been found
            let gameCanvas: HTMLCanvasElement;

            try {
                // make a canvas and set attributes
                gameCanvas = document.createElement("canvas") as HTMLCanvasElement;
                gameCanvas.id = Renderer._canvasId;

                gameCanvas.width = Renderer.Width;
                gameCanvas.height = Renderer.Height;
                gameCanvas.style.border = "thick solid #0000FF"; // hardcoded for now

                // add canvas into the DOM
                document.body.appendChild(gameCanvas);

                // get canvas context(webgl)
                const gameCtx = gameCanvas.getContext('experimental-webgl');
                
                // set this context ( private )
                this._gl = gameCtx as WebGLRenderingContext;

                // set global context
                window.GL = this._gl;
            }

            catch(err) {
                throw new Error("Problem Creating Canvas");
            };

            // set the html viewport
            Renderer._viewport = gameCanvas;

            /** WebGL Pre-Graphic Setup */
            // Set clear color to black, fully opaque
            GL.clearColor(0.0, 0.0, 0.0, 1.0);
            // Clear the color buffer with specified clear color
            GL.clear(GL.COLOR_BUFFER_BIT);
            // Set the viewport
            GL.viewport(0, 0, Renderer.Width, Renderer.Height);
            // Enable Webgl Depth Test
            GL.enable(GL.DEPTH_TEST);
        };
    };

    /**
     * Renders all elements of world on Renderer.
     */
    renderWorld(): void {
        GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);

        SceneManager.CURRENT_SCENE.render();
    };
};