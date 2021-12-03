// sample script for particle
import {
    Behavior,
    Material,
    Color,
    RenderComponent,
    ColorMaterial
} from '@GETS';

// change color of particle
export class ColorChanger extends Behavior {
    private ownerМaterial: ColorMaterial;
    private _counter: number = 0;

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