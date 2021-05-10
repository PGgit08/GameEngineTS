// so we don't get build-breaking errors 
const fS = require("fs");

fS.rm("build-tsc", {recursive: true}, (err) => {/* console.log(err) */console.log("Folder build-tsc does not exist")});
fS.rm("build-babel", {recursive: true}, (err) => {/* console.log(err) */console.log("Folder build-babel does not exist")});