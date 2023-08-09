import { Behavior, Entity, Scene, SceneManager, testEngine } from "../src/engine/GETS";

class TestBehavior extends Behavior {
    constructor() { super("TestBehavior"); }

    public load() {
        setTimeout((() => {
            Entity.Despawn(SceneManager.getInstance().getScene("S").getEntityByName("E")[0]);
        }).bind(this), 5000);
    }

    public update(): void {}
}

// PASSED //

/**
 * Finds an Entity in a test behavior and Despawns it.
 */
testEngine("find-and-delete", () => {
    const e = new Entity("E");
    const s = new Scene("S");

    s.addEntities(e);
    e.addComponents(new TestBehavior());
});
