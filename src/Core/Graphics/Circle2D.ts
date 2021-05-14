import Vector2 from '@physics/Vector';

export default class Circle2D{
    // position of the circle
    center: Vector2;

    // radius of the circle  
    radius: number;

    constructor(r: number, c: Vector2){
        this.radius = r;
        this.center = c;
    };
};
