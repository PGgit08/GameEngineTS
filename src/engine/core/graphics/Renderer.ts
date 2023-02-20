import { GameObject } from "../ecs/GameObject";
import { Lifecycle } from "../Lifecycle";

export class Renderer extends GameObject implements Lifecycle {
    private _width: number;
    private _height: number;

    private _canvasId: string;

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    get canvasId(): string {
        return this._canvasId;
    }

    constructor(name: string, canvasId?: string){
        super(name, true);

        if (canvasId != undefined) {
            this._canvasId = canvasId;

            this.fromCanvas();
        }

        if (canvasId == undefined) {
            this._width = 800;
            this._height = 600;

            this.createCanvas();
        }
    }

    /**
     * Build this Renderer if a canvas is supplied
     */
    private fromCanvas(): void {
        const gameCanvas: HTMLCanvasElement = document.getElementById(this._canvasId) as HTMLCanvasElement;

        this._width = gameCanvas.width;
        this._height = gameCanvas.height;
    }

    /**
     * Build this Renderer if there is no canvas supplied
     */
    private createCanvas(): void {
        const gameCanvas: HTMLCanvasElement = document.createElement("canvas") as HTMLCanvasElement;
        gameCanvas.id = this.id;

        gameCanvas.width = this._width;
        gameCanvas.height = this._height;

        gameCanvas.style.border = "thick solid #0000FF"; 

        document.body.appendChild(gameCanvas);
    }

    public start(): void {
        console.log("Renderer Start");
    }

    public update(): void {
        console.log("Renderer Update");
    }

    public render(): void {
        console.log("Renderer Render");
    }
}
