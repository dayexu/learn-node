var mongoose = require("mongoose");
var db = mongoose.connect("mongodb://127.0.0.1/test");



var userSchema = new mongoose.Schema({
  name : {type : String},
  age : {type : Number},
  sex : {type : String},
  profession : {type : String},
  hobby : {type : String},
  create_time : {type : Date,default : Date.now()}
});
//添加实例方法,只能在entity的时候调用
userSchema.methods.findByName = function(name,cb) {
  return this.model("user").find({name: name},cb);
};
//添加静态方法，静态方法在Model层就可以调用
userSchema.statics.findBySex = function(sex,cb) {
  return this.model("user").find({sex: sex},cb);
};

var userModel = db.model("user",userSchema);


var user1 = {name: "晴明", age: "24", sex: "男", profession: "阴阳师", hobby: "带狗粮"};
var user2 = {name: "源博雅", age: "25", sex: "男", profession: "阴阳师", hobby: "打架射箭"};

//通过entity进行cduq
var user1Entity = new userModel(user1);
//保存
// user1Entity.save(function(err,doc) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(doc);
//   }
//   // db.close();
// });

//查询操作
// user1Entity = new userModel({});
// user1Entity.findByName("晴明",function(err,result) {
//   if (err) {
//     console.log(err);
//   } else {
//     console.log(result);
//   }
//   // db.close();
// });


//=======================================================通过model进行cduq====================================
//创建
// userModel.create(user2,function(error) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("save ok");
//   }
// });

//修改
//条件
// var conditions = {_id: "584a0dd5036a841fe09e057b"};
// //要修改的值
// var update = {$set: {name: "八百比丘尼",age: 26, sex: "女", hobby: "高深莫测"}};
// //options
// var options = {upset: true};
// userModel.update(conditions,update,options,function(error) {
//   if (error) {
//     console.log(error);
//   } else {
//     console.log("update ok");
//   }
// });

//查询
var conditions = {};  //不带参数查询全部
//返回的字段
var fields = {};  //{name: 1,age: 1}
var options = {};
userModel.find(conditions,fields,options,function(error,result) {
  if (error) {
    console.log(error);
  } else {
    console.log(result);
  }
});

// //删除
// var conditions = {name: "八百比丘尼"};
// userModel.remove(conditions,function(error) {
// if (error) {
//     console.log(error);
//   } else {
//     console.log("remove ok");
//   }
// });


