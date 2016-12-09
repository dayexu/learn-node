var fs = require("fs");

//用buffer来读取文件，适合小文件
var source = fs.readFileSync("../buffer/o_psb.jpg");

fs.writeFileSync("o_psb_stream.jpg",source);