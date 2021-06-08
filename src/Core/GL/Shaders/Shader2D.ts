import { GLMatrix4 } from "@gl/GLMatrix4";
import { GLShader } from "@gl/GLShader";

/**
 * A simple built-in 2D shader
 */
export class Shader2D extends GLShader{
    constructor(){
        super("Shader2D");

        this.load(this.vSource(), this.fSource());
    };

    public ApplyStandardUniforms(model: GLMatrix4, projection: GLMatrix4, view: GLMatrix4){
        this.use();

        this.setUniformMatrix('model', model);
        this.setUniformMatrix('projection', projection);
        this.setUniformMatrix('view', view);
    };

    private vSource(): string{
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

    private fSource(): string{
        // sets color to white
        return `
            void main(void){
                gl_FragColor = vec4(0.0, 0.0, 0.0, 0.1);
            }
        `;
    };
};