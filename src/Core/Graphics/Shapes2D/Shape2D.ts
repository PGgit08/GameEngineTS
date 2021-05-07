namespace Engine{
    /** Represents a basic 2D shape. */
    export interface IShape2D {
        /** The position of this shape. */
        position: Vector2;

        /* The offset between the position and the origin */
        offset: Vector2;

        /* The point of which to rotate around for this item */
        origin: Vector2;

        /* Later on code for checking collisions */
        intersects: () => any;

        /* For calculating the offset of a shape */
        calculate_offset: () => Vector2;
    };

    export abstract class TShape2D implements IShape2D{
        /* implemntation of IShape2D */
        position: Vector2;

        offset: Vector2;

        origin: Vector2;

        /* Set some math functions as well as the constructor */
        constructor(){
            this.offset = this.calculate_offset();
        };

        intersects(){

        };

        calculate_offset(): Vector2{
            return new Vector2(this.position.x - this.origin.x, this.position.y - this.origin.y);
        };
    };
};