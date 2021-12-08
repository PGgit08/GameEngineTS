import { 
    Particle,
    RenderComponent,
    Color,
    ColorMaterial,
    Behavior,
    Wait,
    Random,
    Vector2,
    Renderer
 } from "@GETS";

export class ParticleSummoner extends Behavior {
    private _colors: Color[] = [Color.BLUE, Color.GREEN, Color.ORANGE];

    private _particleInstanced: boolean = false;

    constructor(){
        super("ParticleSummoner");
    };

    update(){
        if(!this._particleInstanced){
            this._particleInstanced = true;
            Wait(500).then(() => {
                // create a particle
                const NewParticle: Particle = new Particle();

                // set config of particle
                (NewParticle.getComponent(RenderComponent).mesh.material as ColorMaterial).tint = this._colors[Random(this._colors.length)];
                NewParticle.Transform.position = new Vector2(Random(Renderer.Width), Random(Renderer.Height));

                // add this particle to the owner
                this.owner.addChild(NewParticle);

                this._particleInstanced = false;
            });
        }; 
    };

};