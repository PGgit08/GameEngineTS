import { GLMatrix4 } from "@gl/GLMatrix4";
import { GLShader } from "@gl/GLShader";
import { Color } from "@graphics/Color";
import { Material } from "@graphics/Material";

/**
 * A simple built-in 2D shader
 */
export class Shader2D extends GLShader{
    constructor(){
        super("Shader2D");

        // this.load()
    };

    /**
     * Apply standard uniforms to this shader.
     * @param material The material associating with this shader.
     * @param model The model matrix.
     * @param projection The projection matrix.
     * @param view The view matrix.
     */
    public ApplyStandardUniforms(material: Material, model: GLMatrix4, projection: GLMatrix4, view: GLMatrix4){
        this.use();

        this.setUniformMatrix('model', model);
        this.setUniformMatrix('projection', projection);
        this.setUniformMatrix('view', view);

        this.setUniformColor('color', material.tint);
    };

    public get vSource(): string{
        return `
            attribute vec2 coords;
            uniform mat4 model;
            uniform mat4 projection;
            uniform mat4 view;
            void main(){
                gl_Position = projection * view * model * vec4(coords, 0, 1.0);
            }
        `;
    };

    public get fSource(): string{
        return `
            precision mediump float;
            uniform vec4 color;
            void main(void){
                gl_FragColor = color;
            }
        `;
    };
};