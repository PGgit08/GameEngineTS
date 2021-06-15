import { GLMatrix4 } from "@gl/GLMatrix4";
import { Vector2 } from "@physics/Vector";

/**
 * Represents a WebGL matrix stack for the model matrix
 * Similar to HTML5 Canvas save/restore stack
 */
export class GLStack{
    private _stack: GLMatrix4[] = [GLMatrix4.identity()];

    public push(m: GLMatrix4){
        this._stack.push(m);
    };

    public pop(){
        this._stack.pop();

        if(this._stack.length === 0){
            this.push(GLMatrix4.identity());
        };
    };    

    /**
     * The current matrix(top of the stack)
     * @returns GLMatrix4
     */
    public get currentMatrix(): GLMatrix4{
        return this._stack[this._stack.length - 1];
    };
}; 