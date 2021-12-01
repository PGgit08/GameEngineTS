import { Particle, SceneManager, Behavior, Vector2 } from "@GETS";

class ParticleSummoner extends Behavior {
    private _counter: number = 0;

    constructor(){
        super("ParticleSummoner");
    };

    update(){
        this._counter ++;

        if(this._counter == 100){
            // doodoo instantiation, just experimental for now
            let TestParticle: Particle = new Particle();
            TestParticle.Transform.position = new Vector2(300, 200);

            SceneManager.CURRENT_SCENE.geEntityByName("Particles").addChild(TestParticle);
        };
    };

};