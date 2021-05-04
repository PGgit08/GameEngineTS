namespace Engine{
    export class Circle2D implements IShape2D{
        // position that defaults to forward(0, 1)
        position = Vector2.forward;

        // circle properties(radius, etc.)
        radius: number;

        intersects(){
            /* Later on code for Circle/Rectangle collision */
        };

    };
};