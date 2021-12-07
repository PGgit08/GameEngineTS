export class Color{
    // RGBA color properties
    public r: number; // red
    public g: number; // green
    public b: number; // blue
    public a: number; // alpha (transparency)

    public static BLACK: Color = new Color(0, 0, 0);
    public static WHITE: Color = new Color(255, 255, 255);
    public static GREEN: Color = new Color(0, 255, 0);
    public static BLUE: Color = new Color(0, 0, 255);
    public static YELLOW: Color = new Color(255, 255, 0);
    public static RED: Color = new Color(255, 0, 0);
    public static ORANGE: Color = new Color(255, 128, 0);

    /**
     * Create a new Color instance, provide RGBA values.
     * @param r The r value of the Color.
     * @param g The g value of the Color.
     * @param b The b value of the Color.
     * @param a The a value of the Color(default: 1).
     */
    constructor(r: number, g: number, b: number, a: number = 255){
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    };


    /**
     * Turn the r, g, b, a values into webgl vec4 color floats.
     * @returns Float array.
     */
    public toFloatArray(): number[]{
        return [this.r / 255.0, this.g / 255.0, this.b / 255.0, this.a / 255.0];
    };

    public toFloat32Array(): Float32Array{
        return new Float32Array(this.toFloatArray());
    };
};