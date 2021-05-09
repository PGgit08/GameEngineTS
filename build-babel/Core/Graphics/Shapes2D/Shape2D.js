"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Engine;
(function (Engine) {
    ;

    var TShape2D = function () {
        /* Set some math functions as well as the constructor */
        function TShape2D() {
            _classCallCheck(this, TShape2D);

            this.offset = this.calculate_offset();
        }

        _createClass(TShape2D, [{
            key: "intersects",
            value: function intersects() {}
        }, {
            key: "calculate_offset",
            value: function calculate_offset() {
                return new Engine.Vector2(this.position.x - this.origin.x, this.position.y - this.origin.y);
            }
        }]);

        return TShape2D;
    }();

    Engine.TShape2D = TShape2D;
    ;
})(Engine || (Engine = {}));
;
//# sourceMappingURL=Shape2D.js.map