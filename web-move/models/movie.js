var mongoose = require("mongoose");
var MovieSchema = require("../schemas/movie");

//将MovieSchema编译生成MovieModel
var MovieModel = mongoose.model("movie",MovieSchema);

module.exports = MovieModel;