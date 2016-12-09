var stream = require("stream");
var util = require("util");

//构造自己的ReadStream对象
function ReadStream() {
	//让自己可以使用stream.Readable上下文
	stream.Readable.call(this);
}
//继承stream.Readable，就可以重写里面的方法了
util.inherits(ReadStream,stream.Readable);
ReadStream.prototype._read = function() {
	this.push("I");
	this.push("LOVE");
	this.push("YOU");
	this.push(null);
}

//构造自己的WritStream对象
function WritStream() {
	stream.Writable.call(this);
	// this._cached = new Buffer("");
}
util.inherits(WritStream,stream.Writable);
WritStream.prototype._write = function(chunk,encode,cb) {
	console.log(chunk.toString());
	cb();
}

//构造自己的TransformStream对象
function TransformStream() {
	stream.Transform.call(this);
}
util.inherits(TransformStream,stream.Transform);
TransformStream.prototype._transform = function(chunk,encode,cb) {
	this.push(chunk);
	cb();
}
TransformStream.prototype._flush = function(cb) {
	//放入自己想附加的内容
	this.push("lalalalalalala");
	cb();
}



var rs = new ReadStream();
var ws = new WritStream();
var ts = new TransformStream();

rs.pipe(ts).pipe(ws);