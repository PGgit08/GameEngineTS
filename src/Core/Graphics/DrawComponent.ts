import { TComponent } from "@ecs/Component/IComponent";
import { Drawable } from "@graphics/Drawable";
import { RendererProps } from "@renderer/IViewProps";

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
        /* sets drawing's transform properties to owner's NOTE: this will change with matricies */
        this._currentDrawing.scale = this.owner.transform.scale;
        this._currentDrawing.rotation = this.owner.transform.rotation;
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
        this._currentDrawing.draw(this.owner.transform.position);
    };
};