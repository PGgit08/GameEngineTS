"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Engine;
(function (Engine) {
    // still testing this out
    var TGameObject = function TGameObject() {
        _classCallCheck(this, TGameObject);

        this.id = TGameObject.GLOBAL_ID++;
    };

    TGameObject.GLOBAL_ID = 0;
    Engine.TGameObject = TGameObject;
    ;
})(Engine || (Engine = {}));
;
//# sourceMappingURL=TGameObject.js.map