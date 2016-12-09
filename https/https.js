var https = require("https")
var fs = require("fs")

//读取ssh证书
var options = {
	key : fs.readFileSync("ssh_key.pem"),
	cert : fs.readFileSync("ssh_cert.pem")
}

https
	.createServer(options,function(req,res) {
		res.writeHead(200);
		res.end("Hello Nodejs");
	})
	.listen(99999)