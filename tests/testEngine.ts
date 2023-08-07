import {
    Engine, SampleRenderer, SampleScene
} from '../src/engine/GETS';

export function testEngine(): void {
    Engine.Start({
        renderers: [SampleRenderer],
        scenes: [SampleScene],
        defaults: {
            renderer: "SampleRenderer",
            scene: "SampleScene"
        }
    });
}
