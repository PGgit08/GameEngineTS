namespace Engine{
    // still testing this out
    export class TGameObject{
        public static GLOBAL_ID: number = 0;

        id: number;

        constructor(){
            this.id = TGameObject.GLOBAL_ID ++;
        };
    };
};