"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// just making a vector class for fun
var Engine;
(function (Engine) {
    var Vector2 = function () {
        function Vector2(x, y) {
            _classCallCheck(this, Vector2);

            this.x = x;
            this.y = y;
            this.mag = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
        }

        _createClass(Vector2, [{
            key: "add",

            // vector arithmetic
            value: function add(v) {
                return new Vector2(this.x + v.x, this.y + v.y);
            }
        }, {
            key: "subtract",
            value: function subtract(v) {
                return new Vector2(this.x - v.x, this.y - v.y);
            }
        }, {
            key: "multiply",
            value: function multiply(v) {
                return new Vector2(this.x * v.x, this.y * v.y);
            }
        }, {
            key: "divide",
            value: function divide(v) {
                return new Vector2(this.x / v.y, this.y / v.y);
            }
        }, {
            key: "scale",

            // for scaling the vector
            value: function scale(s) {
                this.x *= s;
                this.y *= s;
            }
        }, {
            key: "normalized",

            // normalize the vector(make it a unit vector, to get it's direction)
            value: function normalized() {
                var normalize = new Vector2(Math.round(this.x / this.mag), Math.round(this.y / this.mag));
                return normalize;
            }
        }]);

        return Vector2;
    }();
    // static types for basic vectors


    Vector2.forward = new Vector2(0, -1);
    Vector2.back = new Vector2(0, 1);
    Vector2.left = new Vector2(-1, 0);
    Vector2.right = new Vector2(1, 0);
    Engine.Vector2 = Vector2;
    ;
})(Engine || (Engine = {}));
;
//# sourceMappingURL=Vector.js.map