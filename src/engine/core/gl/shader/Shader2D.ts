import { Shader } from "./Shader";

export class Shader2D extends Shader {
    public get vSource(): string {
        return `
        // an attribute will receive data from a buffer
        attribute vec2 a_position;
        attribute vec2 a_texcoord;

        // varyings will pass variables from the shader to the fragement shader
        varying vec2 v_texcoord;
      
        // the 2D clipspace position
        vec2 clipspace_position;

        // uniforms will recieve data dynamically from the code
        uniform mat3 u_projection;
        uniform mat3 u_model;

        // all shaders have a main function
        void main() {
            v_texcoord = a_texcoord;

            // turn 2D position into 3D position for matrix multiplication, then turn result into 4D WebGL vector
            clipspace_position = (u_projection * u_model * vec3(a_position, 1)).xy; // order of multiplication matters here, right to left
            gl_Position = vec4(clipspace_position, 0.0, 1.0);
        }
        `;
    }
    public get fSource(): string {
        return `
        precision mediump float;
 
        // Passed in from the vertex shader.
        varying vec2 v_texcoord;
         
        // The texture.
        uniform sampler2D u_texture;

        // The color.
        uniform vec4 u_color;
         
        void main() {
            gl_FragColor = u_color * texture2D(u_texture, v_texcoord);
            // gl_FragColor = u_color;
        }
        `;
    }

    // A simple 2D Shader that has color and texture support. 
    constructor() { super("Shader2D"); }
}