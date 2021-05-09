const fs = require("fs");

const error_callback = (err) => {
    // console.log(err);
};

fs.rm("build-babel", {recursive:true}, error_callback);
fs.rm("build-tsc",  {recursive:true}, error_callback);


