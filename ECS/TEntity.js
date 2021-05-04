var Engine;
(function (Engine) {
    class TEntity extends Engine.TGameObject {
        constructor() {
            super();
            // entity properties
            this.children = [];
            this.components = [];
            this.transform = new Engine.Transform();
        }
        ;
        update(dt) {
            for (let c of this.components) {
                c.update(dt);
            }
            ;
        }
        ;
        render() {
            for (let c of this.components) {
                c.render();
            }
            ;
        }
        ;
    }
    Engine.TEntity = TEntity;
    ;
})(Engine || (Engine = {}));
;
