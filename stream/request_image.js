var http = require("http");
var request = require("request");
var fs = require("fs");


http
.createServer(function(req,res) {
	fs.readFile("",function(err,data) {
		//通常做法
		// if (err) {
		// 	res.end("file nor exist!");
		// } else {
		// 	res.writeHead(200,{"Context-Type":"text/html"});
		// 	res.end(data);
		// }
		// 
		
		// fs.createReadStream("o_psb_stream.jpg").pipe(res);
		// request module对stream封装
		// 边下载边传输到client，缓解服务器压力
		request("http://preview.quanjing.com/fod_liv002/fo-11171537.jpg").pipe(res);
	});
})
.listen(8090);