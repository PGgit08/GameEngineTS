import { Vector2 } from "@GETS";
import { AttributeInfo, GLBuffer } from "@gl/GLBuffer";
import { ShaderConfig } from "@graphics/ShaderManager";
import { Geometry } from "./Geometry";

export class RightTriangle extends Geometry {
    /**
     * Create a new RightTriangle Geometry.
     * @param width Width of this right triangle.
     * @param height Height of this right triangle.
     * @param anchor Anchor point of this right triangle.
     */
    constructor(width: number = 100, height: number = 100, anchor = new Vector2(0.5, 0.5)){
        super(width, height, anchor);
    };

    protected initBuffer(): GLBuffer {
        return new GLBuffer();
    };

    protected setAttribs(): void {
        let posAttribute: AttributeInfo = new AttributeInfo();

        posAttribute.location = ShaderConfig.ATTRIBS.coords;
        posAttribute.size = 2;

        this._buffer.addAttribute(posAttribute);
    };

    protected geometry(): number[] {
        return [
            this._minX, this._minY,
            this._minX, this._maxY,
            this._maxX, this._maxY
        ];
    };
};