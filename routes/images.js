const express = require('express');
const router = express.Router();
const logger=require('../config/log4js');
const MongoDB=require('../utils/mongodb');

/* GET home page. */
router.get('/', function(req, res) {
    logger.info('there is a req...');
    //查询一条数据
    MongoDB.findOne('user', {_id: '0'}, function (err, res) {
        console.log(res);
    });
    res.send([{text:"床前明月光"},{text:"疑是地上霜"},{text:"床前明月光"}]);
});

module.exports = router;
