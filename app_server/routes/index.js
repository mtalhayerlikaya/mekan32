var express = require('express');
var router = express.Router();
ctrlMain = require("../controllers/main");
/* GET home page. */
router.get('/',ctrlMain.index);
router.get('/admin',ctrlMain.admin);
module.exports = router;
