import { Shader } from "./Shader";

export class Shader2D extends Shader {
    get vSource(): string {
        return `
        // TESTING, IGNORE
        mat3 testModel = mat3(
          1.0, 0.0, 0.0,
          0.0, 1.0, 0.0,
          100.0, 100.0, 1.0
        );

        // an attribute will receive data from a buffer
        attribute vec2 a_position;
      
        // the 2D clipspace position
        vec2 clipspace_position;

        // uniforms will recieve data dynamically from the code
        uniform mat3 projection;
        uniform mat3 model;

        // all shaders have a main function
        void main() {
          // turn 2D position into 3D position for matrix multiplication, then turn result into 4D WebGL vector
          clipspace_position = (projection * model * vec3(a_position, 1)).xy; // order of multiplication matters here, right to left
          gl_Position = vec4(clipspace_position, 0.0, 1.0);
        }
        `;
    }

    get fSource(): string {
        return `
        // fragment shaders don't have a default precision so we need
        // to pick one. mediump is a good default
        precision mediump float;
      
        uniform vec4 color;

        void main() {
          // gl_FragColor is a special variable a fragment shader
          // is responsible for setting
          gl_FragColor = color;
        }
        `;
    }

    /**
     * A default 2D Shader with color support.
     */
    constructor() { super("Shader2D"); }
}
