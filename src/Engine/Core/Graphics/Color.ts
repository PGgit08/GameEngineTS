export class Color{
    private _r: number; 
    private _g: number;
    private _b: number;
    private _a: number;


    /**
     * Turn the r, g, b, a values into webgl vec4 color floats.
     * @returns Float array.
     */
    public toFloatArray(): number[]{
        return [this._r / 255.0, this._g / 255.0, this._b / 255.0, this._a / 255.0];
    };

    public toFloat32Array(): Float32Array{
        return new Float32Array(this.toFloatArray());
    };
};