import {
    Engine, SampleRenderer, Scene
} from '../../GETS';

/**
 * A helper function for testing the Engine. Creates a new Engine instance and runs a user supplied testing callback.
 * 
 * @param {{ (): void }} test - The testing callback.
 */
export function testEngine(test: () => void): void {
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
}
