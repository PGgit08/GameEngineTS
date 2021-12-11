import { 
    Mesh,
    Geometry,
    ColorMaterial,
    GLBuffer,
    AttributeInfo,
    ShaderConfig
} from '@GETS';

class CarGeometry extends Geometry {
    constructor(){
        super(150, 50);
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
            this._minX, (this._minY + this._height / 2),
            this._minX, this._maxY,
            this._maxX, this._maxY,
            this._minX, (this._minY + this._height / 2),
            this._maxX, (this._minY + this._height / 2),
            this._maxX, this._maxY
        ];
    };
};

export class CarMesh extends Mesh {
    constructor(){
        super(new CarGeometry(), new ColorMaterial());
    };
};
