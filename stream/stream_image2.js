var fs = require("fs");


//用流来读取，适合大文件

var readStream = fs.createReadStream("o_psb_stream.jpg");
var writeStream = fs.createWriteStream("o_psb_stream_copy.jpg");


readStream
.on("data",function(chunk) {
	if(writeStream.write(chunk) == false) {	//若没有写完就先停止读取，以免读入缓冲区爆炸
		console.log("still cached");
		readStream.pause();
	}
})
.on("end",function() {
	console.log("data end")
})



writeStream
.on("drain",function() {	//写完了，可以继续读取
	console.log("data drain");
	readStream.resume();
})