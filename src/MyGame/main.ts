import {
    Engine, 
    RendererManager, 
    DefaultRenderer, 
    SceneManager,
    Entity,
    MoveBehavior,
    EngineConfig
} from "../engine/GETS"

// MANUAL LOADING IMPORTS
import { Renderer } from "../engine/core/graphics/Renderer";
import { ShaderManager } from "../engine/core/managers/ShaderManager";
import { Scene } from "../engine/core/ecs/Scene";
import { MeshComponent } from "../engine/core/graphics/MeshComponent";
import { Square } from "../engine/core/graphics/geometry/Square";
import { ColorMaterial } from "../engine/core/graphics/material/ColorMaterial";
import { Mesh } from "../engine/core/graphics/Mesh";
import { Vector2 } from "../engine/core/math/Vector2";
import { Input } from "../engine/extra/Input";
import { MyScene } from "./scenes/MyScene";

// THIS IS USED TO SIMULATE ASSET LOADING IN THE LOADING PERIOD 
const onLoad = (): void => {
    console.log("onLoad() from main.ts! (TESTING)");

    // FIRST look for renderers and load them
    const renderer: Renderer = new DefaultRenderer();
    RendererManager.getInstance().setCurrentRenderer(renderer);
    RendererManager.getInstance().load();

    // CALL ADDITIONAL Input Load
    Input.addListeners();

    // CALL ADDITIONAL ShaderManager load
    ShaderManager.getInstance().load();

    // NEXT look for scenes and load them (MANUAL SCENE BUILDING HERE)
    const scene1: Scene = new Scene("Scene1");

    const prefabEntity: Entity = new Entity("Square Prefab"); // SOME DUMB PREFAB TESTING
    prefabEntity.addComponents(new MeshComponent(new Mesh(new Square(), new ColorMaterial())));

    // PREFAB CLONING IN LOAD
    const entity1: Entity = Entity.Clone(prefabEntity);
    const entity2: Entity = Entity.Clone(prefabEntity);

    entity1.transform.position = new Vector2(500, 500);
    entity2.transform.position = new Vector2(100, 100);

    entity1.addBehaviors(new MoveBehavior());
    entity1.addChildren(entity2);

    scene1.addEntities(entity1);

    console.log(prefabEntity, entity1, entity2);

    SceneManager.getInstance().setCurrentScene(scene1);
    SceneManager.getInstance().load();
} 

// TESTING
const engineConfig: EngineConfig = {
    scenes: [MyScene],
    renderers: [DefaultRenderer]
};

new Engine(
    onLoad,
    (): void => { console.log("onStart() from main.ts!"); }
);

export {}
