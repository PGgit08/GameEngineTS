import { VertexArray } from "@gl/VertexArray";


/**
 * Represents the information needed for a GLBuffer attribute.
 **/
// (copied from NarmovTech)
export class AttributeInfo {
    /**
     * The location of this attribute.
     */
    public location: number;

    /**
     * The size (number of elements) in this attribute (i.e Vector2 = 2).
     */
    public size: number;
};

/**
 * A WebGL buffer object
 */
export class GLBuffer {
    // mode, bufferType: array, dataType: float
    private _mode: number;
    private _bufferType: number;
    private _dataType: number;

    // the actual webgl buffer
    private _buffer: WebGLBuffer;

    // the actual data(position info) + shader attributes to send positions to
    private _data: number[] = [];

    // The VAO object for the attributes of this buffer.
    private _vertexArray: VertexArray;

    // if this buffer has any shader attributes
    private _hasAttributes: boolean = false;

    // the size of each element in this buffer( Vector2 = elementSize 2 for example )
    private _elementSize: number = 0;
    
    public get data(): number[]{
        return this._data;
    };

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

        this._vertexArray = new VertexArray();
    };

    /**
     * Deletes this buffer completly.
     */
    public destroy(): void {
        GL.deleteBuffer(this._buffer);
        this._vertexArray.destroy();
    };

    /**
     * Sets current buffer to this one ( binding ).
     * @param normalize Whether to normalize the coordiantes or not ( default: false ).
     */
    public bind(): void {
        GL.bindBuffer(this._bufferType, this._buffer);

        // if the shader has attributes assiosated with this buffer
        // tell webgl how to set the attributes with a pointer
        // and enable 
        if (this._hasAttributes) {
            this._vertexArray.bind();
        };
    };

    /**
     * Unbinds this buffer(removes it from being current).
     */
    public unbind(): void {
        // sets current buffer to "undefined"
        GL.bindBuffer(this._bufferType, undefined);

        // disable the shader attributes
        if (this._hasAttributes) {
            this._vertexArray.unbind();
        };
    };

    /**
     * Adds an attribute to this buffer with the correct info.
     * @param info The attribute info.
     */
    public addAttribute(info: AttributeInfo): void {
        this._hasAttributes = true;

        // set the current buffer and VAO
        this.bind();

        GL.vertexAttribPointer(info.location, info.size, this._dataType, false, 0, 0);
        GL.enableVertexAttribArray(info.location);

        // unbind current buffer and VAO
        this.unbind();

        // increase element size by size that attribute wants
        this._elementSize += info.size;
    };
    
    
    /**
     * Replaces the current data in this buffer with the provided data.
     * @param data The data to be loaded in this buffer.
     */
    public setData(data: number[]): void {
        this.clearData();
        this.pushBackData(data);
    };

    /**
     * Adds data to this buffer.
     * @param data
     */
    public pushBackData(data: number[]): void {
        for(let d of data){
            this._data.push(d);
        };
    };

    /**
     * Clears out all data in this buffer.
     * */
    public clearData(): void {
        this._data.length = 0;
    };

    /**
     * Sends this buffer to the GPU.
     */
    public upload(): void {
        // make sure to bind first
        this.bind();

        // create the bufferData variable as a binary array
        let bufferData: ArrayBuffer;

        // check what type upload array should be
        switch(this._dataType){
            case GL.FLOAT:
                bufferData = new Float32Array(this._data);
                break;
        };

        // upload buffer to GPU
        GL.bufferData(
            this._bufferType,
            bufferData,
            GL.STATIC_DRAW
        );

        this.unbind();
    };

    /**
     * Draws the buffer.
     */
    public draw(): void {
        if(this._bufferType === GL.ARRAY_BUFFER){
            // sticking to this one for now
            GL.drawArrays(
                this._mode,
                0,
                this._data.length / this._elementSize
            );
        }
        else if(this._bufferType === GL.ELEMENT_ARRAY_BUFFER){
            GL.drawElements(
                this._mode,
                this._data.length,
                this._dataType,
                0
            );
        };
    };
};