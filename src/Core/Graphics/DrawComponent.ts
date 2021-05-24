import { TComponent } from "@ecs/Component/IComponent";
import Drawable from "@graphics/Drawable";

/**
 * A Graphics Component for managing the Drawing/Graphics of an Entity.
 */
export default class DrawComponent extends TComponent{
    private _currentDrawing: Drawable;
    
    constructor(){
        super("DrawComponent");
    };

    public setCurrentDrawing(d: Drawable){
        this._currentDrawing = d;
    };

    render(){
        /* NOTE: Currently drawing at the owner's position, but this will change */
        this._currentDrawing.draw(this.owner.transform.position);
    };
};