// an interface, like a template, which contains empty values
// of specific types
interface IPerson{
    name: string;
    age: number;
    height: number;
};

// creating a new interface which extends to IPerson(is a child of IPerson)
// therefore containing values that IPerson contains + its own values
interface IHobbyPerson extends IPerson{
    hobbies: string[]|string|number
};

// create a new variable of type interface IHobbyPerson, and enter the specific value for the
// interface
const myself: IHobbyPerson = {name:"peter", age:10, height:10, hobbies:["Swimming", "Coding", "Piano"]};

// log
console.log(myself);

// create a new class called Peter(me!)

// implement the Interface, or "template", and create properties
// based on the "template" or the IHobbyPerson interface
class Peter implements IHobbyPerson{
    // class's properties

    // use properties from "myself", which is a type of IHobbyPerson
    name = myself.name;
    age = myself.age;
    height = myself.height;
    hobbies = myself.hobbies;

    // an example of generics, creating an item with an 
    // Array type, which has "string" in it (Array<string <- >)
    sibilings: Array<string> = ["Paul"];
    schoolname: string = "NestM";

    // and example of encapsulation
    // address is "private", so it is only avaliable
    // to this class
    private address: string;

    protected p_address: string;

    // ordinary constructor
    constructor(address:string){
        this.address = address;
        this.p_address = address;
    };

    // class function, is public, avaliable outside class

    // : void is saying that this simply returns nothing
    // "void"
    public HeyThere(): void{
        // log property name(this.name)
        console.log("Hey There! this is " + this.name);
    };

    // create a public static function
    public static SomethingRandom(): string{
        return "Something Random";
    };
};

// call static function
console.log(Peter.SomethingRandom());

// istantiate Peter(new Peter), and make a new variable called PeterClone
// of type Peter
const PeterClone: Peter = new Peter("foo bar");
PeterClone.HeyThere();

// will return error because "address" is a private property
// UNCOMMENT LINE BELOW TO SEE 
// console.log(PeterClone.address);

// same thing with protected property
// UNCOMMENT LINE BELOW TO SEE 
// console.log(PeterClone.p_address);

// creating a child of Peter
class PChild extends Peter{
    constructor(address:string){
        // init Peter, with address of type "string"
        super(address);
    };

    show_encapsulation(): void{
        // since p_address of Peter is protected, it acts like a private property
        // but can be accessed from children classes of the Peter class
        console.log(this.p_address);

        // privates still won't work in children though
        // UNCOMMENT LINE BELOW TO SEE
        // console.log(this.address);
    };
    
};

// showing example above:
const PChildClone: PChild = new PChild("foo bar");
PChildClone.show_encapsulation();

// finnaly a little namespace example:
namespace Example{
    // export a variable
    export var lang: string = "TypeScript";  
};