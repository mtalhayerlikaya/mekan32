var express = require('express');
var router = express.Router();

 const hakkinda = function(req, res, next) {
  res.render('hakkinda', { 
    title: 'Hakkında',
    'footer': 'Muhammed Talha Yerlikaya'
   });
}

module.exports={
	hakkinda
}


