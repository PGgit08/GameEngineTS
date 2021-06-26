/**
 * Mathematical 2D Vector
 */
export class Vector2{
    // items are public by default
    // x and y and magnitude for vector
    x: number;
    y: number;
    mag: number;

    // static types for basic unit vectors
    static forward: Vector2 = new Vector2(0, -1);
    static back: Vector2 = new Vector2(0, 1);
    static left: Vector2 = new Vector2(-1, 0);
    static right: Vector2 = new Vector2(1, 0);
    static origin: Vector2 = new Vector2(0, 0);
    static one: Vector2 = new Vector2(1, 1);

    /**
     * Creates a new 2D vector.
     * @param x X position of vector.
     * @param y Y position of vector.
     */
    constructor(x:number, y:number){
        this.x = x;
        this.y = y;

        this.mag = Math.sqrt(x**2 + y**2);
    };

    // vector arithmetic (non-static)

    /**
     * Adds vectors.
     * @param v Vector to be added to this one.
     */
    public add(v: Vector2){
        this.x += v.x;
        this.y += v.y;
    };

    /**
     * Subtracts vectors.
     * @param v Vector to be subtracted from this one.
     */
    public subtract(v: Vector2){
        this.x -= v.x;
        this.y -= v.y;
    };

    /**
     * Multiplies vectors.
     * @param v Vector to be multiplied with this one.
     */
    public multiply(v: Vector2){
        this.x *= v.x;
        this.y *= v.y;
    };

    /**
     * Divides Vectors.
     * @param v Vector to be the dividend of this one.
     */
    public divide(v: Vector2){
        this.x /= v.x;
        this.y /= v.y;
    };

    /**
     * Negates this vector.
     */
    public negative(): void{
        this.x = -this.x;
        this.y = -this.y;
    };

    // vector arithmetic (static)
    /**
     * Adds two vectors.
     * @param v1 Vector #1.
     * @param v2 Vector #2.
     * @returns new 2D Vector.
     */
    static add(v1: Vector2, v2:Vector2){
        return new Vector2(v1.x + v2.x, v1.y + v2.y);
    };

    /**
     * Adds two vectors.
     * @param v1 Vector #1.
     * @param v2 Vector #2.
     * @returns new 2D Vector.
     */
    static subtract(v1: Vector2, v2:Vector2){
        return new Vector2(v1.x - v2.x, v1.y - v2.y);
    };

    /**
     * Adds two vectors.
     * @param v1 Vector #1.
     * @param v2 Vector #2.
     * @returns new 2D Vector.
     */
    static multiply(v1: Vector2, v2:Vector2){
        return new Vector2(v1.x * v2.x, v1.y * v2.y);
    };

    /**
     * Adds two vectors.
     * @param v1 Vector #1.
     * @param v2 Vector #2.
     * @returns new 2D Vector.
     */
    static divide(v1: Vector2, v2:Vector2){
        return new Vector2(v1.x / v2.y, v1.y / v2.y);
    };

    /**
     * Scales this Vector.
     * @param s Number to scale by.
     */
    scale(s: number): void{
        this.x *= s;
        this.y *= s; 
    };

    /**
     * Normalizes this Vector (makes it a unit vector).
     * @returns A unit Vector.
     */
    normalized(){
        const normalize = new Vector2(Math.round(this.x/this.mag), Math.round(this.y/this.mag));
        return normalize;
    };
};