import { TComponent } from '@ecs/Components/IComponent';
import Circle2D from '@graphics/Shape2D/Circle2D';
import Vector2 from '@physics/Vector';
import { RendererProps } from '@renderer/IViewProps';


export default class Particle extends TComponent{
    renderItem: Circle2D;

    constructor(){
        super();
        this.renderItem = new Circle2D(10, Vector2.forward);
    };

    update(dt: number){
        /* This can later on be used for Circle2D.intersects */
        this.renderItem.center = this.owner.transform.position;
    };

    render(renderProps: RendererProps){
        this.renderItem.draw();
    };  
};
