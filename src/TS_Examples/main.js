;
;
// create a new variable of type interface IHobbyPerson, and enter the specific value for the
// interface
const myself = { name: "peter", age: 10, height: 10, hobbies: ["Swimming", "Coding", "Piano"] };
// log
console.log(myself);
// create a new class called Peter(me!)
// implement the Interface, or "template", and create properties
// based on the "template" or the IHobbyPerson interface
class Peter {
    // ordinary constructor
    constructor(address) {
        // class's properties
        // use properties from "myself", which is a type of IHobbyPerson
        this.name = myself.name;
        this.age = myself.age;
        this.height = myself.height;
        this.hobbies = myself.hobbies;
        // an example of generics, creating an item with an 
        // Array type, which has "string" in it (Array<string <- >)
        this.sibilings = ["Paul"];
        this.schoolname = "NestM";
        this.address = address;
        this.p_address = address;
    }
    ;
    // class function, is public, avaliable outside class
    // : void is saying that this simply returns nothing
    // "void"
    HeyThere() {
        // log property name(this.name)
        console.log("Hey There! this is " + this.name);
    }
    ;
    // create a public static function
    static SomethingRandom() {
        return "Something Random";
    }
    ;
}
;
// call static function
console.log(Peter.SomethingRandom());
// istantiate Peter(new Peter), and make a new variable called PeterClone
// of type Peter
const PeterClone = new Peter("foo bar");
PeterClone.HeyThere();
// will return error because "address" is a private property
// UNCOMMENT LINE BELOW TO SEE 
// console.log(PeterClone.address);
// same thing with protected property
// UNCOMMENT LINE BELOW TO SEE 
// console.log(PeterClone.p_address);
// creating a child of Peter
class PChild extends Peter {
    constructor(address) {
        // init Peter, with address of type "string"
        super(address);
    }
    ;
    show_encapsulation() {
        // since p_address of Peter is protected, it acts like a private property
        // but can be accessed from children classes of the Peter class
        console.log(this.p_address);
        // privates still won't work in children though
        // UNCOMMENT LINE BELOW TO SEE
        // console.log(this.address);
    }
    ;
}
;
// showing example above:
const PChildClone = new PChild("foo bar");
PChildClone.show_encapsulation();
// finnaly a little namespace example:
var Example;
(function (Example) {
    // export a variable
    Example.lang = "TypeScript";
})(Example || (Example = {}));
;
