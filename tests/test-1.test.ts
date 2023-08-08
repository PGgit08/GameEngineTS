import { 
    Entity,
    Scene,
    testEngine 
} from "../src/engine/GETS";

testEngine(() => {
    const e = new Entity("Bob");
    const s = new Scene("Test Scene");

    // adds and removes an entity during creation
    s.addEntities(e);
    s.removeEntity(e);

    console.log(s);
});
