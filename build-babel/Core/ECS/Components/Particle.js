"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Engine;
(function (Engine) {
    var Particle = function (_Engine$TComponent) {
        _inherits(Particle, _Engine$TComponent);

        function Particle() {
            _classCallCheck(this, Particle);

            // a simple shape item(circle)
            // that runs on RigidBody physics
            var _this = _possibleConstructorReturn(this, (Particle.__proto__ || Object.getPrototypeOf(Particle)).call(this));

            _this.renderItem = new Engine.Circle2D();
            // set renderItem's position to owner's position
            _this.renderItem.position = _this.owner.transform.position;
            return _this;
        }

        _createClass(Particle, [{
            key: "update",
            value: function update() {
                /* This can later on be used for Circle2D.intersects */
            }
        }, {
            key: "render",
            value: function render() {}
        }]);

        return Particle;
    }(Engine.TComponent);

    Engine.Particle = Particle;
    ;
})(Engine || (Engine = {}));
;
//# sourceMappingURL=Particle.js.map