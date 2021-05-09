"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Engine;
(function (Engine) {
    var Circle2D = function (_Engine$TShape2D) {
        _inherits(Circle2D, _Engine$TShape2D);

        function Circle2D() {
            _classCallCheck(this, Circle2D);

            // position that defaults to forward(0, 1)
            var _this = _possibleConstructorReturn(this, (Circle2D.__proto__ || Object.getPrototypeOf(Circle2D)).call(this));

            _this.position = Engine.Vector2.forward;
            return _this;
        }

        _createClass(Circle2D, [{
            key: "intersects",
            value: function intersects() {
                /* Later on code for Circle/Rectangle collision */
            }
        }]);

        return Circle2D;
    }(Engine.TShape2D);

    Engine.Circle2D = Circle2D;
    ;
})(Engine || (Engine = {}));
;
//# sourceMappingURL=Circle2D.js.map