import IViewProps from '@renderer/IViewProps';

export default class RenderView{
    private ctx: CanvasRenderingContext2D;

    constructor(canvasId:string, canvasProps:IViewProps){
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

                gameCanvas.style.width = canvasProps.width;
                gameCanvas.style.height = canvasProps.height;
                gameCanvas.style.border = "thick solid #0000FF"; // hardcoded for now

                // add canvas into the DOM
                document.body.appendChild(gameCanvas);

                // get canvas context
                const gameCtx = gameCanvas.getContext('2d');
                
                // set this context(private)
                this.ctx = gameCtx;

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