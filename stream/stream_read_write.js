var Readable = require("stream").Readable;
var Writable = require("stream").Writable;

var readStream = new Readable();
var writStream = new Writable();

readStream.push("I");
readStream.push("LVOE");
readStream.push("YOU");
readStream.push(null);	//push 结束

writStream._write = function(chunk,encode,cb) {
	console.log(chunk.toString());
	cb && cb();
}

readStream.pipe(writStream);