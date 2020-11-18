var express = require('express');
var router = express.Router();

module.exports.index = function(req,res,next){
  res.render("index",{title:"Talha"});
};

module.exports.admin = function(req,res,next){
  res.render("admin",{title:"Admin"});
};