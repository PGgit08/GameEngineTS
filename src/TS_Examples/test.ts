// continuing namespace example

// to get a namespace from another file /// <reference/> is used
/// <reference path = "main.ts" /> 

// use the namespace from last main.ts
namespace Example{
    // function to log out Example.lang
    export const show_lang = () => {console.log(lang) };
};

// call function from namespace
Example.show_lang();