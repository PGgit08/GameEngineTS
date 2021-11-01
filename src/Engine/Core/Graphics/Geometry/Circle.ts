import { Vector2 } from "@GETS";
import { AttributeInfo, GLBuffer } from "@gl/GLBuffer";
import { ShaderConfig } from "@graphics/ShaderManager";
import { Geometry } from "./Geometry";

export class Circle extends Geometry {
    /**
     * Create a new Rectangle Geometry.
     * @param width Width of this rectangle.
     * @param height Height of this rectangle.
     * @param anchor Anchor point of this rectangle.
     */
    constructor(width: number = 100, height: number = 100, anchor = new Vector2(0.5, 0.5)){
        super(width, height, anchor);
    };

    protected initBuffer(): GLBuffer {
        return new GLBuffer(GL.TRIANGLE_FAN);
    };

    protected setAttribs(): void {
        let posAttribute: AttributeInfo = new AttributeInfo();

        posAttribute.location = ShaderConfig.ATTRIBS.coords;
        posAttribute.size = 2;

        this._buffer.addAttribute(posAttribute);
    };

    protected geometry(): number[] {
        let geo: number[] = [];

        geo.push(...[this._anchorPoint.x, this._anchorPoint.y]);

        for(let d = 0; d <= 360; d ++){
            let newVertex: Vector2 = Vector2.add(
                this._anchorPoint,
                new Vector2(
                    this._width * Math.cos(d * Math.PI / 180),
                    this._height * Math.sin(d * Math.PI / 180) 
                )
            );
            
            geo.push(
                ...[newVertex.x, newVertex.y]
            );
        };

        return geo;
    };
};