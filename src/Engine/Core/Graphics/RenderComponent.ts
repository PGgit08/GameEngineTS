import { TComponent } from "@ecs/Component/IComponent";
import { Mesh } from "@graphics/Mesh";
import { RenderProps } from "@renderer/IViewProps";
import { Renderer } from "@renderer/Renderer";

/**
 * A Graphics Component for managing the Drawing/Graphics of an Entity.
 */
export class RenderComponent extends TComponent{
    private _mesh: Mesh;
    
    constructor(){
        super("DrawComponent");
    };

    public set mesh(m: Mesh){
        this._mesh = m;
    };

    public get mesh(): Mesh{
        return this._mesh;
    };

    /**
     * Loads the current drawable's mesh into GPU.
     */
    load(){
        this._mesh.loadGeometry();

        this._mesh.geometry.upload();
        this._mesh.geometry.unbind();
    };

    update(){
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
        this._mesh.draw(this.owner.worldMatrix, Renderer.renderProps.pMatrix, Renderer.renderProps.vMatrix);
    };
};