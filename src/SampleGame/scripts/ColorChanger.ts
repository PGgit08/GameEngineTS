// sample script for particle
import {
    TBehavior,
    Material,
    Color,
    RenderComponent,
    ColorMaterial
} from '@GETS';

// change color of particle
export class ColorChanger extends TBehavior {
    private ownerМaterial: ColorMaterial;

    constructor(){
        super('ColorChanger');
    };

    start(): void {
        this.ownerМaterial = this.owner.getComponent(RenderComponent).mesh.material as ColorMaterial;
    };

    update(): void {
        this.ownerМaterial.tint = Color.green;
    };
}; 