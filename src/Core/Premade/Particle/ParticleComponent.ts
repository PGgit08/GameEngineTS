import { TComponent } from '@ecs/Components/IComponent';
import Circle2D from '@graphics/Shape2D/Circle2D';
import Vector2 from '@physics/Vector';
import { RendererProps } from '@renderer/IViewProps';


export default class ParticleComponent extends TComponent{
    renderItem: Circle2D;
    position: Vector2 = Vector2.origin;

    constructor(){
        super("Particle");
        this.renderItem = new Circle2D(100, this.position);
    };

    update(dt: number){
        // console.log(this.position);
        this.renderItem.center = this.position;
    };

    render(renderProps: RendererProps){
        // in later rendering renderProps
        // can be used for buffering and etc.
        this.renderItem.draw();
    };  
};
