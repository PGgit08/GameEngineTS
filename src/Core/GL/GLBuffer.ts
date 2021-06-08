/**
 * Represents the information needed for a GLBuffer attribute.
 **/
// (copied from NarmovTech)
export class AttributeInfo{
    /**
     * The location of this attribute.
     */
    public location: number;

    /**
     * The size (number of elements) in this attribute (i.e Vector2 = 2).
     */
    public size: number;

    /**
     * The number of elements from the beginning of the buffer.
     * example: buffer(coordinates): [1, 2](len=2), so offset = 2
     */
    public offset: number = 0;
};

/**
 * A WebGL buffer object
 */
export class GLBuffer{
    // mode, bufferType: array, dataType: float
    private _mode: number;
    private _bufferType: number;
    private _dataType: number;

    // the actual webgl buffer
    private _buffer: WebGLBuffer;

    // the actual data(position info) + shader attributes to send positions to
    private _data: number[] = [];
    private _attributes: AttributeInfo[] = [];

    // if this buffer has any shader attributes(locations)
    private _hasAttributeLocation: boolean = false;

    // the size of a position element in this buffer(example: Vector2 = 2)
    private _elementSize: number;

    // the size of the dataType(example: GL.FLOAT = 4)
    private _typeSize: number;
    
    // the amount of bytes to get from one set of numbers to the next
    // (example: elementSize * typeSize)
    private _stride: number;

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
     * Sets current buffer to this one(binding).
     * @param normalize Whether to normalize the coordiantes or not(default: false).
     */
    public bind(normalize: boolean = false): void{
        GL.bindBuffer(this._bufferType, this._buffer);

        // if the shader has attributes assiosated with this buffer
        // tell webgl how to set the attributes with a pointer
        // and enable 
        if(this._hasAttributeLocation){
            for(let att of this._attributes){
                // kind of confused on this line(86)
                GL.vertexAttribPointer(att.location, att.size, this._dataType, normalize, this._stride, att.offset * this._typeSize);
                GL.enableVertexAttribArray(att.location);
            };
        };
    };

    /**
     * Unbinds this buffer(removes it from being current).
     */
    public unbind(): void{
        // sets current buffer to "undefined"
        GL.bindBuffer(this._bufferType, undefined);

        // disable the shader attributes
        for(let att of this._attributes){
            GL.disableVertexAttribArray(att.location);
        };
    };

    /**
     * Adds an attribute to this buffer with the correct info.
     * @param info The attribute info.
     */
    public addAttribute(info: AttributeInfo){
        this._hasAttributeLocation = true;
        info.offset = this._elementSize;
        this._attributes.push(info);

        // increases the size of a position element in this buffer to the size of the attribute
        this._elementSize += info.size;
        this._stride = this._elementSize * this._typeSize;
    };
    
    
    /**
     * Replaces the current data in this buffer with the provided data.
     * @param data The data to be loaded in this buffer.
     */
    public setData(data: number[]): void{
        this.clearData();
        this.pushBackData(data);
    };

    /**
     * Adds data to this buffer.
     * @param data
     */
    public pushBackData(data: number[]): void{
        for(let d of data){
            this._data.push(d);
        };
    };

    /**
     * Clears out all data in this buffer.
     * */
    public clearData(): void{
        this._data.length = 0;
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