import { TComponent } from '@ecs/Components/IComponent';
import Circle2D from '@graphics/Circle2D';
import Vector2 from '@physics/Vector';


export default class Particle extends TComponent{
    // a simple shape item(circle)
    // that runs on RigidBody physics
    
    // following basic plan
    renderItem: Circle2D;

    constructor(){
        super();
        // console.log(this.owner);
        this.renderItem = new Circle2D(10, Vector2.forward);
    };

    update(){
        /* This can later on be used for Circle2D.intersects */
        this.renderItem.center = this.owner.transform.position;
    };

    render(){
        // for now just render a circle primitive
        // console.log("RENDER");
        this.renderItem.draw();
    };  
};
