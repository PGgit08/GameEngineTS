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

    // for now render like this
    draw(){
        CTX.beginPath();
        CTX.arc(this.center.x, this.center.y, this.radius, 0, 2 * Math.PI);
        CTX.stroke();
        // CTX.closePath();
    };
};
