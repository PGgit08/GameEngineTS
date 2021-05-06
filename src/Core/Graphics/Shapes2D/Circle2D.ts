namespace Engine{
    export class Circle2D implements IShape2D{
        // position that defaults to forward(0, 1)
        position = Vector2.forward;

        // shape properties
        origin: Vector2;

        offset: Vector2;

        // circle properties(radius, etc.)
        radius: number;

        constructor(){
            this.offset = this.calculate_offset();
        };

        intersects(){
            /* Later on code for Circle/Rectangle collision */
        };

        calculate_offset(): Vector2{
            /* Calculate the offset */
            return new Vector2(this.position.x - this.origin.x, this.position.y - this.origin.y);
        };

    };
};