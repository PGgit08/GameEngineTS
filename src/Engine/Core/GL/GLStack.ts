import { GLMatrix4 } from "@gl/GLMatrix4";
import { Vector2 } from "@physics/Vector";

/**
 * Represents a WebGL matrix stack for the model matrix
 * Similar to HTML5 Canvas save/restore stack
 */
export class GLStack{
    private _stack: GLMatrix4[] = [];

    /**
     * Remove the current matrix from the stack.
     */
    restore(){
        this._stack.pop();

        this._stack[0] = GLMatrix4.identity();
    };

    /**
     * Push the current matrix into the stack.
     */
    save(){
        this._stack.push(this.currentMatrix);
    };

    /**
     * Rotate the current matrix
     * @param r Angle in radians
     */
    rotate(r: number): void{
        GLMatrix4.rotation(r);
    };

    /**
     * Translate the current matrix
     * @param t Vector2 translation vector
     */
    translate(t: Vector2): void{
        GLMatrix4.translation(t);
    };

    /**
     * Scale the current matrix
     * @param s Vector2 scaling vector
     */
    scale(s: Vector2): void{
        GLMatrix4.scale(s);
    };

    /**
     * The current matrix(top of the stack)
     * @returns GLMatrix4
     */
    public get currentMatrix(): GLMatrix4{
        return this._stack[this._stack.length - 1];
    };

    private set setCurrentMatrix(m: GLMatrix4){
        this._stack[this._stack.length - 1] = m;
    };
}; 