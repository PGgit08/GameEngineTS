var Engine;
(function (Engine) {
    class Circle2D {
        constructor() {
            // position that defaults to forward(0, 1)
            this.position = Engine.Vector2.forward;
            this.offset = this.calculate_offset();
        }
        ;
        intersects() {
            /* Later on code for Circle/Rectangle collision */
        }
        ;
        calculate_offset() {
            /* Calculate the offset */
            return new Engine.Vector2(this.position.x - this.origin.x, this.position.y - this.origin.y);
        }
        ;
    }
    Engine.Circle2D = Circle2D;
    ;
})(Engine || (Engine = {}));
;
