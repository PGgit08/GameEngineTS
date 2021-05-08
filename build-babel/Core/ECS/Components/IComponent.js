"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Engine;
(function (Engine) {
    ;
    // create an abstract class where setOwner sets the owner
    // in the interface

    var TComponent = function () {
        function TComponent() {
            _classCallCheck(this, TComponent);
        }

        _createClass(TComponent, [{
            key: "setOwner",
            value: function setOwner(o) {
                this.owner = o;
            }
        }, {
            key: "update",
            value: function update(dt) {}
        }, {
            key: "render",
            value: function render() {}
        }]);

        return TComponent;
    }();

    Engine.TComponent = TComponent;
    ;
})(Engine || (Engine = {}));
;
//# sourceMappingURL=IComponent.js.map