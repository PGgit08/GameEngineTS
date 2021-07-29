import { TComponent } from "@ecs/Component/IComponent";
import { Renderable } from "@graphics/Renderable";
import { RenderProps } from "@renderer/IViewProps";
import { Renderer } from "@renderer/Renderer";

/**
 * A Graphics Component for managing the Drawing/Graphics of an Entity.
 */
export class RenderComponent extends TComponent{
    private _currentDrawing: Renderable;
    
    constructor(){
        super("DrawComponent");
    };

    public setCurrentDrawing(d: Renderable){
        this._currentDrawing = d;
    };

    public get currentDrawing(): Renderable{
        return this._currentDrawing;
    };

    /**
     * Loads the current drawable's mesh into GPU.
     */
    load(){
        this._currentDrawing.loadMesh();

        this._currentDrawing.mesh.upload();
        this._currentDrawing.mesh.unbind();
    };

    update(dt: number){
    };

    /**
     * Draws the current drawing.
     * @param renderProps The Engine RendererProps.
     */
    render(){
        /*
        Drawable item is equal to it's owners
        transform, unlike an entity's child,
        which is RELATIVE to it's owner.
        */
        this._currentDrawing.draw(this.owner.worldMatrix, Renderer.renderProps.pMatrix, Renderer.renderProps.vMatrix);
    };
};