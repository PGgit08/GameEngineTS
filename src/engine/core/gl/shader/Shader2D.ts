import { Shader } from "./Shader";

export class Shader2D extends Shader {
    get vSource(): string {
        return `
        // an attribute will receive data from a buffer
        attribute vec2 a_position;
      
        // the final clipspace position
        vec4 clipspace_position;

        // uniforms will recieve data dynamically from the code
        mat3 projection = mat3(1.0);

        // all shaders have a main function
        void main() {
          // turn 2D position into 3D position for matrix multiplication, then turn result into 4D WebGL vector
          clipspace_position = vec4((projection * vec3(a_position, 1)).xy, 0.0, 1.0);
          gl_Position = clipspace_position;
        }
        `;
    }

    get fSource(): string {
        return `
        // fragment shaders don't have a default precision so we need
        // to pick one. mediump is a good default
        precision mediump float;
      
        void main() {
          // gl_FragColor is a special variable a fragment shader
          // is responsible for setting
          gl_FragColor = vec4(1, 0, 0.5, 1); // return redish-purple
        }
        `;
    }

    constructor() { super("Shader2D"); }
}
