// sample script for particle

import { Color, Drawable, DrawComponent, TBehavior } from "@GETS";
import { Material } from "@graphics/Material";

export class ColorChanger extends TBehavior{
    private ownerМaterial: Material;
    private colors: Color[] = [Color.black, Color.blue, Color.green, Color.red, Color.orange];

    constructor(){
        super('ColorChanger');
    };

    start(){
        this.ownerМaterial = this.owner.getComponent(DrawComponent).currentDrawing.material;

        super.start();
    }

    update(dt: number){
        this.ownerМaterial.tint = this.colors[4]

        super.update(dt);
    };
}; 