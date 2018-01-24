const express = require('express');
const router = express.Router();
const logger=require('../config/log4js');

/* GET home page. */
router.get('/', function(req, res) {
    logger.info('there is a req...');
    res.send([{text:"床前明月光"},{text:"疑是地上霜"},{text:"床前明月光"}]);
});

module.exports = router;
