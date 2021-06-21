import { AttributeInfo, GLBuffer } from "@gl/GLBuffer";
import { ShaderManager } from "@gl/ShaderManager";
import { Drawable } from "@graphics/Drawable";
import { Vector2 } from "@physics/Vector";

/**
 * A Drawable for a 2D Circle
 */
export class Circle2D extends Drawable{ 
    private _r: number;

    /**
     * Creates a new Drawable 2D Circle
     * @param r The radius of the circle.
     */
    constructor(r: number){
        super();

        this.calcSize(r);
        this.calcBox();

        this._r = r;
    };

    // calculates the width and height based on radius
    private calcSize(r: number){
        this._width = r * 2;
        this._height = r * 2;
    };

    makeBuffer(): void{
        ShaderManager.SetShader('Shader2D');
        this._shader = ShaderManager.ACTIVE_SHADER;

        // triangle fan so that all triangles can be drawn around a center vertex
        this._buffer = new GLBuffer(GL.FLOAT, GL.ARRAY_BUFFER, GL.LINE_LOOP);

        let posAttribute: AttributeInfo = new AttributeInfo();

        posAttribute.location = this._shader.getAttributeLocation('coords');
        posAttribute.size = 2;

        this._buffer.addAttribute(posAttribute);

        this._buffer.setData(
            [
                this.center.x, this.center.y
            ]
        );  

        for(let d = 0; d <= 360; d++){
            let newVertex: Vector2 = Vector2.add(
                this.center,
                new Vector2(
                    this._r * Math.cos(d * Math.PI / 180),
                    this._r * Math.sin(d * Math.PI / 180) 
                )
            );
            
            this._buffer.pushBackData(
                [newVertex.x, newVertex.y]
            );
        };
    };
};