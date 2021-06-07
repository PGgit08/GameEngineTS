import { mat4 } from 'gl-matrix';

/**
 * A class for WebGL matrix math.
 * Built of the glMatrix library.
 * A 4x4 matrix
 */
export class GLMatrix4{
    // the glMatrix object correspoing to this object
    private _glMatrix: mat4;

    /**
     * @param mat Optional glMatrix mat4 to add to this object.
     */
    constructor(mat?: mat4){
        if(mat){
            this._glMatrix = mat;
        }

        else{
            this._glMatrix = mat4.create();
        };
    };

    public get glMatrix(): mat4{
        return this._glMatrix;
    };

    public set glMatrix(mat: mat4){
        this._glMatrix = mat;
    };

    /**
     * Creates a new identity matrix.
     * @returns glMatrix 4x4 Matrix object.
     */
    static identity(): GLMatrix4{
        return new GLMatrix4(mat4.create());
    };

    /**
     * Creates a WebGL "projection" matrix that turns pixel coordinates into clipspace. 
     * @param w Width of RenderView.
     * @param h Height of RenderView.
     * @returns glMatrix 4x4 Matrix object.
     */
    static projection(w: number, h: number): GLMatrix4{
        // make an orthogonic matrix for scaling pixel coordinates(near + far clip is 0 since 2d)
        let glMat: mat4 = mat4.create();
        mat4.ortho(glMat, 0, w, h, 0, 0, 0);

        // create a new 4x4 identity matrix
        const projectionMat = new GLMatrix4(glMat);

        // return
        return projectionMat;
    };

    static translation(){
        
    };

    static rotation(){

    };

    static scale(){

    };
};