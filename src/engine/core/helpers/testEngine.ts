import {
    Engine, SampleRenderer, Scene
} from '../../GETS';

/**
 * A helper function for testing the Engine. Creates a new Engine instance and runs a user supplied testing callback.
 * 
 * @param {string} name - The name of the test.
 * @param {{ (): void }} test - The testing callback.
 */
export function testEngine(name: string, test: () => void): void {
    console.log(`TESTING "${name}"`);

    try {
        Engine.Start({
            scenes: [
                class extends Scene { constructor() { super("MainScene"); test(); } }
            ],
            renderers: [SampleRenderer],
            defaults: {
                scene: "MainScene",
                renderer: "SampleRenderer"
            }
        });
    } catch (e) {
        throw new Error(`Test ${name} thrown with Error message "${e.message}".`);
    }
}
