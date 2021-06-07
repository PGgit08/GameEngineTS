import { RenderViewProps } from '@renderer/IViewProps';

/**
 * The physical RenderView for the game.
 * Creates WebGL context.
 */
export class RenderView{
    private gl: WebGLRenderingContext;
    private canvasId: string;

    /**
     * Creates a new canvas view off of config.
     * @param canvasId The DOM id of the canvas.
     * @param canvasProps The physical properties for the canvas.
     * @returns null if error.
     */
    constructor(canvasId: string, canvasProps: RenderViewProps){
        const searchElement = document.getElementById(canvasId);
        if(searchElement){
            console.log(searchElement);
        }
        else{
            // no canvas has been found
            try{
                // make a canvas and set attributes
                const gameCanvas = document.createElement("canvas") as HTMLCanvasElement;
                gameCanvas.id = canvasId;

                gameCanvas.width = canvasProps.width;
                gameCanvas.height = canvasProps.height;
                gameCanvas.style.border = "thick solid #0000FF"; // hardcoded for now

                // add canvas into the DOM
                document.body.appendChild(gameCanvas);

                // get canvas context(webgl)
                const gameCtx = gameCanvas.getContext('experimental-webgl');
                
                // set this context(private) and canvasId(private)
                this.gl = gameCtx as WebGLRenderingContext;
                this.canvasId = canvasId;

                // set global context
                window.GL = this.gl;
            }
            catch(err){
                console.log("Problem creating Canvas")
                console.log(err);
                return;
            };
        };
    };
};