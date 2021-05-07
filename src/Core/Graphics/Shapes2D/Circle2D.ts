namespace Engine{
    export class Circle2D extends TShape2D{
        // position that defaults to forward(0, 1)
        position = Vector2.forward;

        // shape properties
        origin: Vector2;

        offset: Vector2;

        // circle properties(radius, etc.)
        radius: number;

        constructor(){
            super();
        };

        intersects(){
            /* Later on code for Circle/Rectangle collision */
        };
    };
};