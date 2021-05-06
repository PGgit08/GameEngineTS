var Engine;
(function (Engine) {
    // still testing this out
    class TGameObject {
        constructor() {
            this.id = TGameObject.GLOBAL_ID++;
        }
        ;
    }
    TGameObject.GLOBAL_ID = 0;
    Engine.TGameObject = TGameObject;
    ;
})(Engine || (Engine = {}));
;
