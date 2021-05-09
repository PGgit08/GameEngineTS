"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

;
;
// create a new variable of type interface IHobbyPerson, and enter the specific value for the
// interface
var myself = { name: "peter", age: 10, height: 10, hobbies: ["Swimming", "Coding", "Piano"] };
// log
console.log(myself);
// create a new class called Peter(me!)
// implement the Interface, or "template", and create properties
// based on the "template" or the IHobbyPerson interface

var Peter = function () {
    // ordinary constructor
    function Peter(address) {
        _classCallCheck(this, Peter);

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

    _createClass(Peter, [{
        key: "HeyThere",

        // class function, is public, avaliable outside class
        // : void is saying that this simply returns nothing
        // "void"
        value: function HeyThere() {
            // log property name(this.name)
            console.log("Hey There! this is " + this.name);
        }
    }], [{
        key: "SomethingRandom",

        // create a public static function
        value: function SomethingRandom() {
            return "Something Random";
        }
    }]);

    return Peter;
}();

;
// call static function
console.log(Peter.SomethingRandom());
// istantiate Peter(new Peter), and make a new variable called PeterClone
// of type Peter
var PeterClone = new Peter("foo bar");
PeterClone.HeyThere();
// will return error because "address" is a private property
// UNCOMMENT LINE BELOW TO SEE 
// console.log(PeterClone.address);
// same thing with protected property
// UNCOMMENT LINE BELOW TO SEE 
// console.log(PeterClone.p_address);
// creating a child of Peter

var PChild = function (_Peter) {
    _inherits(PChild, _Peter);

    function PChild(address) {
        _classCallCheck(this, PChild);

        // init Peter, with address of type "string"
        return _possibleConstructorReturn(this, (PChild.__proto__ || Object.getPrototypeOf(PChild)).call(this, address));
    }

    _createClass(PChild, [{
        key: "show_encapsulation",
        value: function show_encapsulation() {
            // since p_address of Peter is protected, it acts like a private property
            // but can be accessed from children classes of the Peter class
            console.log(this.p_address);
            // privates still won't work in children though
            // UNCOMMENT LINE BELOW TO SEE
            // console.log(this.address);
        }
    }]);

    return PChild;
}(Peter);

;
// showing example above:
var PChildClone = new PChild("foo bar");
PChildClone.show_encapsulation();
// finnaly a little namespace example:
var Example;
(function (Example) {
    // export a variable
    Example.lang = "TypeScript";
})(Example || (Example = {}));
;
//# sourceMappingURL=main.js.map