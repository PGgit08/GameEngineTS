"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Engine;
(function (Engine) {
    // really basic tranform class
    var Transform =
    // no rotation yet
    // rotation: Vector2;
    function Transform() {
        _classCallCheck(this, Transform);

        // position vector(defaults to 0,1)
        this.position = Engine.Vector2.forward;
        // nothing here yet
    };

    Engine.Transform = Transform;
    ;
})(Engine || (Engine = {}));
;
//# sourceMappingURL=Transform.js.map