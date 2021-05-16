import { TComponent } from '@ecs/Components/IComponent';
import Circle2D from '@graphics/Shape2D/Circle2D';
import Vector2 from '@physics/Vector';
import { RendererProps } from '@renderer/IViewProps';


export default class Particle extends TComponent{
    renderItem: Circle2D;
    position: Vector2;

    constructor(){
        super("Particle");
        this.renderItem = new Circle2D(100, new Vector2(200, 100));
    };

    update(dt: number){

    };

    render(renderProps: RendererProps){
        // in later rendering renderProps
        // can be used for buffering and etc.
        this.renderItem.draw();
    };  
};
