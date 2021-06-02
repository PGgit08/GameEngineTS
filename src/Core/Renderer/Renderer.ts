import { IGame } from "@game/IGame";
import { RenderViewProps, RendererProps } from "@renderer/IViewProps";
import { RenderView } from "@renderer/RenderView";
import { SceneManager } from "@scenes/SceneManager";

/**
 * A full Renderer for the game.
 */
export class Renderer{
    renderView: RenderView;
    viewProps: RenderViewProps;
    renderProps: RendererProps;

    /**
     * Creates a new physical RenderView and gives it properties.
     * @param viewProps Physical properties of RenderView.
     * @param renderProps Engine properties of Renderer.
     * @param canvasId DOM id of the canvas. @default "gCanvas"
     */
    constructor(viewProps:RenderViewProps, renderProps: RendererProps, canvasId:string="gCanvas"){
        this.renderView = new RenderView(canvasId, viewProps);
        this.viewProps = viewProps;
        this.renderProps = renderProps;
    };

    /**
     * Renders all elements of world on Renderer.
     * @param game The user's IGame.
     */
    renderWorld(game:IGame): void{
        // clear the background first
        CTX.clearRect(0, 0, this.viewProps.width, this.viewProps.height);
        CTX.beginPath();

        SceneManager.CURRENT_SCENE.render(this.renderProps);
        game.Render(this.renderProps.deltaTime);
    };
};