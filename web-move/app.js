var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var _ = require("underscore");
var mongoose = require("mongoose");
var MovieModel = require("./models/movie");

//使用环境变量的里面的PORT或者3000作为端口
var port = process.env.PORT || 3000;
//创建服务器
var app = express();
//连接数据库
mongoose.connect("mongodb://127.0.0.1/movie");

//设置视图目录
app.set("views","./views/pages");
//设置模板引擎
app.set("view engine","jade");
app.use(bodyParser.urlencoded({extended : true}));
//设置静态资源所在的位置
app.use(express.static(path.join(__dirname,"public")));
app.locals.moment = require("moment");
//监听端口
app.listen(port);

console.log("web-move started on port " + port);

//=============================route=====================================
//index.jade
app.get("/",function(req,res) {
  MovieModel.fetch(function(err,movies) {
    if (err) {
      console.log(err);
    }

    res.render("index",{
      title : "movie 电影首页面",
      movies : movies
    });  
  });
});

//detail.jade
app.get("/movie/:id",function(req,res) {
  var id = req.params.id;
  MovieModel.findById(id,function(err,movie) {
    if (err) {
      console.log(err);
    }
    res.render("detail",{
      title : "movie " + movie.title,
      movie : movie
    });  
  });
});

//admin.jade
app.get("/admin/movie",function(req,res) {
    res.render("admin",{
      title : "movie 后台录入页面",
      movie : {
        title : "",
        director : "",
        poster : "",
        flash : "",
        country : "",
        language : "",
        year : "",
        summary : ""
      }
    });   
});

//add or update page
app.get("/admin/update/:id",function(req,res) {
  var id = req.params.id;
  if (id) {
    MovieModel.findById(id,function(err,movie) {
      if (err) {
        console.log(err);
      }
      res.render("admin",{
        title : "movie 后台更新页面",
        movie : movie
      });  
    });
  }
});

//add or update action
app.post("/admin/movie/new",function(req,res) {
  var _id = req.body.movie._id;
  var movieObj = req.body.movie;
  var _movie;
  if (_id !== "undefined") {  //修改
    MovieModel.findById(_id,function(err,movie) {
      _movie = _.extend(movie,movieObj);
      
    });
  } else {
    _movie = new MovieModel({
      director: movieObj.director,
      title: movieObj.title,
      country: movieObj.country,
      language: movieObj.language,
      year: movieObj.year,
      poster: movieObj.poster,
      summary: movieObj.summary,
      flash: movieObj.flash
    });
  }
  _movie.save(function(err,movie) {
    if (err) {
      console.log(err);
    }
    res.redirect("/movie/" + movie._id);
  });
});

//list delete
app.delete("/admin/list",function(req,res) {
  var id = req.query.id;
  console.log(id);
  if (id) {
    MovieModel.remove({_id: id},function(err) {
      if (err) {
        console.log(err);
      } else {
        res.json({success: 1});
      }
    });
  }
});

//list.jade
app.get("/admin/list",function(req,res) {
  MovieModel.fetch(function(err,movies) {
    if (err) {
      console.log(err);
    } 

    res.render("list",{
      title : "movie 后台列表页面",
      movies : movies
    });    
  });
});
