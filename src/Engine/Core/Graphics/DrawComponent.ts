import { TComponent } from "Engine/Core/ECS/Component/IComponent";
import { Drawable } from "Engine/Core/Graphics/Drawable";
import { RendererProps } from "Engine/Core/Renderer/IViewProps";

/**
 * A Graphics Component for managing the Drawing/Graphics of an Entity.
 */
export class DrawComponent extends TComponent{
    private _currentDrawing: Drawable;
    
    constructor(){
        super("DrawComponent");
    };

    public setCurrentDrawing(d: Drawable){
        this._currentDrawing = d;
    };

    update(dt: number){
    };

    /**
     * Draws the current drawing.
     * @param renderProps The Engine RendererProps.
     */
    render(renderProps: RendererProps){
        /*
        Drawable item is equal to it's owners
        transform, unlike an entity's child,
        which is RELATIVE to it's owner.
        */
        this._currentDrawing.draw(this.owner.worldMatrix);
    };
};