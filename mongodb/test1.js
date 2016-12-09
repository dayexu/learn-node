var mongoose = require("mongoose");

var db = mongoose.connect("mongodb://127.0.0.1/test");

//mongodb里面的骨架、原型（类似关系型数据库里面的表结构）
var testSchema = new mongoose.Schema({
  name : {type : String},
  age : {type : Number},
  email : {type : String},
  time : {type : Date,default : Date.now()},
});


//根据骨架创、原型建一个集合(类似关系型数据库里面的根据表结构创建表)
var testModel = db.model("test1",testSchema);

//相当于插入一个数据
var testEntity = new testModel({
  name : "riguangx",
  age : 24,
  email : "xc_jy@sina.cn"
});
testEntity.save(function(err,doc) {
  if (err) {
    console.log(err);
  } else {
    console.log(doc);
  }
  db.close();
});
