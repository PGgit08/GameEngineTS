// just making a vector class for fun
var Engine;
(function (Engine) {
    class Vector2 {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.mag = Math.sqrt(x ** 2 + y ** 2);
        }
        ;
        // vector arithmetic
        add(v) {
            return new Vector2(this.x + v.x, this.y + v.y);
        }
        ;
        subtract(v) {
            return new Vector2(this.x - v.x, this.y - v.y);
        }
        ;
        multiply(v) {
            return new Vector2(this.x * v.x, this.y * v.y);
        }
        ;
        divide(v) {
            return new Vector2(this.x / v.y, this.y / v.y);
        }
        ;
        // for scaling the vector
        scale(s) {
            this.x *= s;
            this.y *= s;
        }
        ;
        // normalize the vector(make it a unit vector, to get it's direction)
        normalized() {
            const normalize = new Vector2(Math.round(this.x / this.mag), Math.round(this.y / this.mag));
            return normalize;
        }
        ;
    }
    // static types for basic vectors
    Vector2.forward = new Vector2(0, -1);
    Vector2.back = new Vector2(0, 1);
    Vector2.left = new Vector2(-1, 0);
    Vector2.right = new Vector2(1, 0);
    Engine.Vector2 = Vector2;
    ;
})(Engine || (Engine = {}));
;
