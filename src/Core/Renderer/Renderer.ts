import { IGame } from "@game/IGame";
import { RenderViewProps, RenderProps } from "@renderer/IViewProps";
import { RenderView } from "@renderer/RenderView";
import { SceneManager } from "@scenes/SceneManager";

/**
 * A full Renderer for the game.
 */
export class Renderer{
    renderView: RenderView;
    public static viewProps: RenderViewProps;
    public static renderProps: RenderProps;

    /**
     * Creates a new physical RenderView and gives it properties.
     * @param viewProps Physical properties of RenderView.
     * @param renderProps Engine properties of Renderer.
     * @param canvasId DOM id of the canvas. @default "gCanvas"
     */
    constructor(viewProps: RenderViewProps, renderProps: RenderProps, canvasId: string="gCanvas"){
        this.renderView = new RenderView(canvasId, viewProps);
        Renderer.viewProps = viewProps;
        Renderer.renderProps = renderProps;
    };

    /**
     * Renders all elements of world on Renderer.
     * @param game The user's IGame.
     */
    renderWorld(game:IGame): void{
        SceneManager.CURRENT_SCENE.render();
        game.Render(Renderer.renderProps.deltaTime);
    };
};