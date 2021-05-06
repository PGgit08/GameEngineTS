namespace Engine{
    /** Represents a basic 2D shape. */
    export interface IShape2D {
        /** The position of this shape. */
        position: Vector2;

        /* The offset between the position and the origin */
        offset: Vector2;

        /* The point of which to rotate around for this item */
        origin: Vector2;

        /* For calculating the offset of a shape */
        calculate_offset: () => Vector2;
    };
};