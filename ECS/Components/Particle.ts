namespace Engine{
    export class Particle extends TComponent{
        // a simple shape item(circle)
        // that runs on RigidBody physics

        private renderItem = new Circle2D();
        
        constructor(){
            super();

            // set renderItem's position to owner's position
            this.renderItem.position = this.owner.transform.position;
        };

        update(){
            /* This can later on be used for Circle2D.intersects */
        };

        render(){
            
        };  
    };
};