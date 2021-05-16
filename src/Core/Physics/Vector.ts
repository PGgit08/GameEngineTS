export default class Vector2{
    // items are public by default
    // x and y and magnitude for vector
    x: number;
    y: number;
    mag: number;

    // static types for basic vectors
    static forward: Vector2 = new Vector2(0, -1);
    static back: Vector2 = new Vector2(0, 1);
    static left: Vector2 = new Vector2(-1, 0);
    static right: Vector2 = new Vector2(1, 0);
    static origin: Vector2 = new Vector2(0, 0);

    constructor(x:number, y:number){
        this.x = x;
        this.y = y;

        this.mag = Math.sqrt(x**2 + y**2);
    };

    // vector arithmetic
    add(v: Vector2){
        return new Vector2(this.x + v.x, this.y + v.y);
    };

    subtract(v: Vector2){
        return new Vector2(this.x - v.x, this.y - v.y);
    };

    multiply(v: Vector2){
        return new Vector2(this.x * v.x, this.y * v.y);
    };

    divide(v: Vector2){
        return new Vector2(this.x / v.y, this.y / v.y);
    };

    // for scaling the vector
    scale(s: number): void{
        this.x *= s;
        this.y *= s; 
    };

    // normalize the vector(make it a unit vector, to get it's direction)
    normalized(){
        const normalize = new Vector2(Math.round(this.x/this.mag), Math.round(this.y/this.mag));
        return normalize;
    };
};