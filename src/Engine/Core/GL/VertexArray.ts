/**
 * A WebGL VAO class ( Vertex Array Object ).
 */
export class VertexArray {

    // the vertex array object ( VAO )
    private _VAO: WebGLVertexArrayObject;
    
    // the WebGL1 extension that will be used to create a VAO
    private _ext: OES_vertex_array_object;

    /**
     * Create a WebGL VAO class ( Vertex Array Object ).
     */
    constructor(){
        this._ext = GL.getExtension("OES_vertex_array_object");

        if(this._ext) {
            this._VAO = this._ext.createVertexArrayOES();
        };

        if(!this._ext) {
            throw new Error("Unable to get WebGL VAO extension");
        };
    };

    /**
     * Binds this VAO.
     */
    public bind(): void {
        this._ext.bindVertexArrayOES(this._VAO);
    };

    /**
     * Unbinds this VAO.
     */
    public unbind(): void {
        this._ext.bindVertexArrayOES(undefined);
    };

    /**
     * Deletes this VAO completely.
     */
    public destroy(): void {
        this._ext.deleteVertexArrayOES(this._VAO);
    };
};
