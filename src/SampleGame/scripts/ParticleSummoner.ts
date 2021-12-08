import { 
    Particle,
    RenderComponent,
    Color,
    ColorMaterial,
    Behavior,
    Wait,
    Random,
    Vector2,
    Renderer,
    Timer
 } from "@GETS";

export class ParticleSummoner extends Behavior {
    private _colors: Color[] = [Color.BLUE, Color.GREEN, Color.ORANGE];

    private _timer: Timer = new Timer(500);

    constructor(){
        super("ParticleSummoner");

        this._timer.callback = () => {
            // create a particle
            const NewParticle: Particle = new Particle();

            // set config of particle
            (NewParticle.getComponent(RenderComponent).mesh.material as ColorMaterial).tint = this._colors[Random(this._colors.length)];
            NewParticle.Transform.position = new Vector2(Random(Renderer.Width), Random(Renderer.Height));

            // add this particle to the owner
            this.owner.addChild(NewParticle);
        };
    };

    update(){
        if(!this._timer.running) {
            this._timer.run();
        };
    };
};