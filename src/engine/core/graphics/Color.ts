import { vec4 } from "gl-matrix";
import { GameObject } from "../ecs/GameObject";

export class Color extends GameObject {
    public readonly r: number;
    public readonly g: number;
    public readonly b: number;
    public readonly a: number;

    public static readonly BLACK: Color = new Color(0, 0, 0);
    public static readonly WHITE: Color = new Color(255, 255, 255);
    public static readonly GREEN: Color = new Color(0, 255, 0);
    public static readonly BLUE: Color = new Color(0, 0, 255);
    public static readonly YELLOW: Color = new Color(255, 255, 0);
    public static readonly RED: Color = new Color(255, 0, 0);
    public static readonly ORANGE: Color = new Color(255, 128, 0);

    /**
     * Creates a new 8-bit RGBA Color.
     * @param r The R value (8-bit).
     * @param g The G value (8-bit).
     * @param b The B value (8-bit).
     * @param a The A value (8-bit). (default = 255)
     */
    constructor(r: number, g: number, b: number, a: number = 255) {
        super("Color");

        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    public toVec4(): vec4 {
        return vec4.fromValues(this.r / 255.0, this.g / 255.0, this.b / 255.0, this.a / 255.0);
    }
}
