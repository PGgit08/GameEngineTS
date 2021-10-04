// sample script for particle
import {
    TBehavior,
    Material,
    Color,
    RenderComponent
} from '@GETS';

// change color of particle
export class ColorChanger extends TBehavior {
    private ownerМaterial: Material;

    constructor(){
        super('ColorChanger');
    };

    start(): void {
        this.ownerМaterial = this.owner.getComponent(RenderComponent).mesh.material;
    };

    update(): void {
        this.ownerМaterial.tint = Color.green;
    };
}; 