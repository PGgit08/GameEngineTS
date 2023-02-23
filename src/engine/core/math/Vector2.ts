export class Vector2 {
    public x: number;
    public y: number;

    constructor(x: number = 0, y: number = 0) {
        this.x = x;
        this.y = y;
    }

    // CLASS METHODS
    public add(v: Vector2): void {
        this.x += v.x;
        this.y += v.y;
    }

    public subtract(v: Vector2): void {
        this.x -= v.x;
        this.y -= v.y;
    }

    public scale(s: number): void {
        this.x *= s;
        this.y *= s;
    }

    public vectorScale(v: Vector2): void {
        this.x *= v.x;
        this.y *= v.y;
    }

    public dot(v: Vector2): number {
        return (this.x * v.x) + (this.y * v.y);
    }

    public mag(): number {
        return Math.sqrt(this.x ** 2 + this.y ** 2);
    }

    public normalized(): Vector2 {
        const mag: number = this.mag();
        return new Vector2(this.x / mag, this.y / mag);
    }


    // STATIC METHODS
    public static add(v1: Vector2, v2: Vector2): Vector2 {
        return new Vector2(v1.x + v2.x, v1.y + v2.y);
    }

    public static subtract(v1: Vector2, v2: Vector2): Vector2 {
        return new Vector2(v1.x - v2.x, v1.y - v2.y);
    }

    public static scale(v: Vector2, s: number): Vector2 {
        return new Vector2(v.x * s, v.y * s);
    }

    public static vectorScale(v1: Vector2, v2: Vector2): Vector2 {
        return new Vector2(v1.x * v2.x, v1.y * v2.y);
    }

    public static dot(v1: Vector2, v2: Vector2): number {
        return (v1.x * v2.x) + (v1.y * v2.y);
    }
}
