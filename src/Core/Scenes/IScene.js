var Engine;
(function (Engine) {
    ;
    // if a scene needs to be created, this class 
    // can be called, and this scene can get pushed into
    // the game loop
    class TScene {
        update() {
            for (let entity of this.entities) {
                /* pre-rendering operations can be done here */
            }
            ;
        }
        ;
        render() {
            /* For now calling each items "render" function,
            but later rendering system will get more advanced */
            for (let entity of this.entities) {
                /* render entity here */
            }
            ;
        }
        ;
    }
    Engine.TScene = TScene;
    ;
})(Engine || (Engine = {}));
;
