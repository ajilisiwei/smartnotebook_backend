var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.send([{text:"床前明月光"},{text:"疑是地上霜"},{text:"床前明月光"},{text:"疑是地上霜"},{text:"床前明月光"},{text:"疑是地上霜"}]);
});

module.exports = router;
