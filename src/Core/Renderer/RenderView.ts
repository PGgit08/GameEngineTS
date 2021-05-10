declare var ctx: HTMLCanvasElement;

class RenderView{
    constructor(ctx_id: string="eCanvas"){
        try{
            document.createElement("canvas").id = ctx_id;
        }
        catch(err){
            alert("Could Not Start Canvas");
            return;
        };
    };
};