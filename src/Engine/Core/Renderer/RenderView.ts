import { RenderViewProps } from '@renderer/IViewProps';

/**
 * The physical RenderView for the game.
 * Creates WebGL context.
 */
export class RenderView {
    private _gl: WebGLRenderingContext;
    
    // some html properties
    private _canvasId: string;
    private _gameCanvas: HTMLCanvasElement;

    /**
     * Creates a new canvas view off of config.
     * @param canvasId The DOM id of the canvas.
     * @param canvasProps The physical properties for the canvas.
     * @returns null if error.
     */
    constructor(canvasId: string, canvasProps: RenderViewProps) {
        const searchElement = document.getElementById(canvasId);
        if(searchElement){
            console.log(searchElement);
        }
        else{
            // no canvas has been found
            try{
                // make a canvas and set attributes
                this._gameCanvas = document.createElement("canvas") as HTMLCanvasElement;
                this._gameCanvas.id = canvasId;

                this._gameCanvas.width = canvasProps.width;
                this._gameCanvas.height = canvasProps.height;
                this._gameCanvas.style.border = "thick solid #0000FF"; // hardcoded for now

                // add canvas into the DOM
                document.body.appendChild(this._gameCanvas);

                // get canvas context(webgl)
                const gameCtx = this._gameCanvas.getContext('experimental-webgl');
                
                // set this context(private) and canvasId(private)
                this._gl = gameCtx as WebGLRenderingContext;
                this._canvasId = canvasId;

                // set global context
                window.GL = this._gl;
            }
            catch(err){
                throw new Error("Problem creating Canvas");
            };
        };

    };

    public SetupRenderer(): void {
        // Set clear color to black, fully opaque
        GL.clearColor(0.0, 0.0, 0.0, 1.0);
        // Clear the color buffer with specified clear color
        GL.clear(GL.COLOR_BUFFER_BIT);
        // set the viewport dimensions for webgl based on html canvas dimensions
        GL.viewport(0, 0, this._gameCanvas.width, this._gameCanvas.height);
        // some WebGL enable
        GL.enable(GL.DEPTH_TEST);
    };

    public get canvasId(): string{
        return this._canvasId;
    };

    public get gameCanvas(): HTMLCanvasElement{
        return this._gameCanvas;
    };
};