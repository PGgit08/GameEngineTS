var Engine;
(function (Engine) {
    class Particle extends Engine.TComponent {
        constructor() {
            super();
            // a simple shape item(circle)
            // that runs on RigidBody physics
            this.renderItem = new Engine.Circle2D();
            // set renderItem's position to owner's position
            this.renderItem.position = this.owner.transform.position;
        }
        ;
        update() {
            /* This can later on be used for Circle2D.intersects */
        }
        ;
        render() {
        }
        ;
    }
    Engine.Particle = Particle;
    ;
})(Engine || (Engine = {}));
;
