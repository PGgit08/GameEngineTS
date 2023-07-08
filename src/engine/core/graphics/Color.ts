import { vec4 } from "gl-matrix";
import { GameObject } from "../ecs/GameObject";

/**
 * @classdesc
 * A GameObject representing a WebGL Color through red, green, blue, and alpha properties. Contains several common static
 * colors.
 * 
 * @class Color
 * @extends GameObject
 * 
 * @param {number} r - The redness of this Color (0 - 255).
 * @param {number} g - The greeness of this Color (0 - 255).
 * @param {number} b - The blueness of this Color (0 - 255).
 * @param {number} [a] - The alpha of this Color (DEFAULT IS 255).
 */
export class Color extends GameObject {
    /** The redness of this Color (0 - 255). @type {number} */
    public readonly r: number;
    
    /** The greeness of this Color (0 - 255). @type {number} */
    public readonly g: number;
    
    /** The blueness of this Color (0 - 255). @type {number} */
    public readonly b: number;
    
    /** The alpha of this Color. @type {number} */
    public readonly a: number;

    public static readonly BLACK: Color = new Color(0, 0, 0);
    public static readonly WHITE: Color = new Color(255, 255, 255);
    public static readonly GREEN: Color = new Color(0, 255, 0);
    public static readonly BLUE: Color = new Color(0, 0, 255);
    public static readonly YELLOW: Color = new Color(255, 255, 0);
    public static readonly RED: Color = new Color(255, 0, 0);
    public static readonly ORANGE: Color = new Color(255, 128, 0);

    constructor(r: number, g: number, b: number, a: number = 255) {
        super("Color");

        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    /**
     * Converts this Color into a 4D Vector.
     * 
     * @returns {vec4} This Color (r, g, b, a) as a 4D Vector.
     */
    public toVec4(): vec4 {
        return vec4.fromValues(this.r / 255.0, this.g / 255.0, this.b / 255.0, this.a / 255.0);
    }
}
