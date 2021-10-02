// sample script for particle
import {
    TBehavior,
    Material,
    Color,
    RenderComponent
} from '@GETS';

// change color of particle
export class ColorChanger extends TBehavior{
    private ownerМaterial: Material;
    private colors: Color[] = [Color.black, Color.blue, Color.green, Color.red, Color.orange];

    constructor(){
        super('ColorChanger');
    };

    start(){
        this.ownerМaterial = this.owner.getComponent(RenderComponent).mesh.material;
    };

    update(){
        this.ownerМaterial.tint = this.colors[4]; // orange

        super.update();
    };
}; 