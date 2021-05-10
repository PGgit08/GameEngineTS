// so we don't get build-breaking errors 
const fS = require("fs");

fS.rm("dist", {recursive: true}, (err) => {/* console.log(err) */console.log("Folder dist does not exist")});