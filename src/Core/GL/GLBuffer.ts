/**
 * A WebGL buffer object
 */
export class GLBuffer{
    private _elementSize: number = 0;
    private _mode: number;
    private _bufferType: number;
    private _dataType: number;

    private _buffer: WebGLBuffer;

    /**
     * Creates a new Buffer object.
     * @param dataType The type of data in this buffer(default: GL.FLOAT).
     * @param bufferType The buffer type for this buffer(default: GL.ARRAY_BUFFER).
     * @param mode The drawing mode of this buffer(default: GL.TRIANGLES).
     */
    constructor(dataType: number = GL.FLOAT, bufferType: number = GL.ARRAY_BUFFER, mode: number = GL.TRIANGLES){
        this._dataType = dataType;
        this._bufferType = bufferType;
        this._mode = mode;

        this._buffer = GL.createBuffer();
    };

    /**
     * Deletes this buffer completly.
     */
    public destroy(): void{
        GL.deleteBuffer(this._buffer);
    };

    /**
     * Sets current buffer to this one.
     */
    public bind(): void{
        GL.bindBuffer(this._bufferType, this._buffer);
    };

    /**
     * Unbinds this buffer(removes it from being current).
     */
    public unbind(): void{
        // sets current buffer to "undefined"
        GL.bindBuffer(this._bufferType, undefined);
    };
    
    /**
     * Sends this buffer to the GPU.
     */
    public upload(): void{
        // make sure to bind
        this.bind();

        // create the bufferData variable as a binary array
        let bufferData: ArrayBuffer;

        // check what type upload array should be
        switch(this._dataType){
            case GL.FLOAT:
                bufferData = new Float32Array();
        };

        // upload buffer to GPU
        GL.bufferData(
            this._bufferType,
            bufferData,
            GL.STATIC_DRAW
        );
    };

    /**
     * Draws the buffer.
     */
    public draw(): void{
        if(this._bufferType === GL.ARRAY_BUFFER){
            GL.drawArrays(
                this._mode,
                0,
                0
            );
        }
        else if(this._bufferType === GL.ELEMENT_ARRAY_BUFFER){
            GL.drawElements(
                this._mode,
                0,
                this._dataType,
                0
            );
        };
    };
};