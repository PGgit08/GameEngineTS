var Engine;
(function (Engine) {
    // really basic tranform class
    class Transform {
        // no rotation yet
        // rotation: Vector2;
        constructor() {
            // position vector(defaults to 0,1)
            this.position = Engine.Vector2.forward;
            // nothing here yet
        }
        ;
    }
    Engine.Transform = Transform;
    ;
})(Engine || (Engine = {}));
;
