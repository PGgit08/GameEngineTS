import { Shader } from "./Shader";
import { ShaderConfig } from "./ShaderConfig";

export class Shader2D extends Shader {
    public get vSource(): string {
        return `
        // an attribute will receive data from a buffer
        attribute vec2 ${ShaderConfig.ATTRIB_NAMES.POSITION_ATTRIBUTE_NAME};
        attribute vec2 ${ShaderConfig.ATTRIB_NAMES.TEXTURE_ATTRIBUTE_NAME};

        // varyings will pass variables from the shader to the fragement shader
        varying vec2 v_texcoord;
      
        // the 2D clipspace position
        vec2 clipspace_position;

        // uniforms will recieve data dynamically from the code
        uniform mat3 ${ShaderConfig.UNIFORM_NAMES.MODEL_MAT};
        uniform mat3 ${ShaderConfig.UNIFORM_NAMES.PROJ_MAT};
        uniform mat3 ${ShaderConfig.UNIFORM_NAMES.VIEW_MAT};

        // all shaders have a main function
        void main() {
            v_texcoord = ${ShaderConfig.ATTRIB_NAMES.TEXTURE_ATTRIBUTE_NAME};

            // turn 2D position into 3D position for matrix multiplication, then turn result into 4D WebGL vector
            // order of multiplication matters here, right to left
            clipspace_position = (${ShaderConfig.UNIFORM_NAMES.PROJ_MAT} * 
                ${ShaderConfig.UNIFORM_NAMES.VIEW_MAT} * 
                ${ShaderConfig.UNIFORM_NAMES.MODEL_MAT}  * 
                vec3(${ShaderConfig.ATTRIB_NAMES.POSITION_ATTRIBUTE_NAME}, 1)).xy; 
            
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
        uniform sampler2D ${ShaderConfig.UNIFORM_NAMES.TEXTURE};

        // The color.
        uniform vec4 ${ShaderConfig.UNIFORM_NAMES.COLOR};
         
        void main() {
            gl_FragColor = ${ShaderConfig.UNIFORM_NAMES.COLOR} * texture2D(${ShaderConfig.UNIFORM_NAMES.TEXTURE}, v_texcoord);
        }
        `;
    }

    // A simple 2D Shader that has color and texture support. 
    constructor() { super("Shader2D"); }
}