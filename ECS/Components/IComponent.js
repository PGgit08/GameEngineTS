var Engine;
(function (Engine) {
    ;
    // create an abstract class where setOwner sets the owner
    // in the interface
    class TComponent {
        constructor() {
        }
        ;
        setOwner(o) {
            this.owner = o;
        }
        ;
        update(dt) { }
    }
    Engine.TComponent = TComponent;
    ;
})(Engine || (Engine = {}));
;
