import { Shader } from "./Shader";

export class TextureShader extends Shader {
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
        attribute vec2 a_texcoord;

        varying vec2 v_texcoord;
      
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

          v_texcoord = a_texcoord;
        }
        `;
    }

    get fSource(): string {
        return `
        precision mediump float;
 
        // Passed in from the vertex shader.
        varying vec2 v_texcoord;
         
        // The texture.
        uniform sampler2D texture;
         
        void main() {
          gl_FragColor = texture2D(texture, v_texcoord);
        }
        `;
    }

    /**
     * A shader with texture support.
     */
    constructor() { super("TextureShader"); }
}