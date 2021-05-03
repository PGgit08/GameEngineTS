// continuing namespace example
// to get a namespace from another file /// <reference/> is used
/// <reference path = "main.ts" /> 
// use the namespace from last main.ts
var Example;
(function (Example) {
    // function to log out Example.lang
    Example.show_lang = () => { console.log(Example.lang); };
})(Example || (Example = {}));
;
// call function from namespace
Example.show_lang();
