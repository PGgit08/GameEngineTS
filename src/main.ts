import TEntity from '@ecs/TEntity';
import Engine from '@engine';
import IGame from '@game/IGame';
import Scene from '@scenes/Scene';
import SceneManager from '@scenes/SceneManager';

class MyGame implements IGame{
    constructor(){

    };

    Start(){
        var SampleScene: Scene = new Scene("SampleScene");
        SceneManager.setCurrentScene("SampleScene");
        console.log(SceneManager.CURRENT_SCENE);
        
        let Particle: TEntity = new TEntity("Particle");

        SampleScene.addObject(Particle);
    };

    Update(deltaTime: number): void{

    };

    Render(deltaTime: number){

    };
};

var GameEngine: Engine = new Engine(new MyGame());
GameEngine.start();
