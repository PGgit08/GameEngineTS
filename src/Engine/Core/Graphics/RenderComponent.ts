import { Component } from "@ecs/Component/Component";
import { Mesh } from "@graphics/Mesh";
import { Renderer } from "@renderer/Renderer";

/**
 * A Graphics Component for managing the Drawing/Graphics of an Entity.
 */
export class RenderComponent extends Component {
    private _mesh: Mesh;
    
    constructor(){
        super("DrawComponent");
    };

    public set mesh(m: Mesh) {
        this._mesh = m;
    };

    public get mesh(): Mesh {
        return this._mesh;
    };

    start() {};
    update() {};

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
        this._mesh.draw(this.owner.worldMatrix, Renderer.ProjectionMatrix, Renderer.ViewMatrix);
    };
};