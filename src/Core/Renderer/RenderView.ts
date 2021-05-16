import { RenderViewProps } from '@renderer/IViewProps';

export default class RenderView{
    private ctx: CanvasRenderingContext2D;
    private canvasId: string;

    constructor(canvasId:string, canvasProps:RenderViewProps){
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

                // get canvas context
                const gameCtx = gameCanvas.getContext('2d');
                
                // set this context(private) and canvasId(private)
                this.ctx = gameCtx;
                this.canvasId = canvasId;

                // set global context
                window.CTX = this.ctx;
            }
            catch(err){
                console.log("Problem creating Canvas")
                console.log(err);
                return;
            };
        };
    };
};