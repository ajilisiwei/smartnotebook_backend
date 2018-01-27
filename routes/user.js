const express = require('express');
const router = express.Router();
const DB = require('../utils/mongodb');
const loggerFactory = require('../config/log4js');
const logger = loggerFactory.getLogger('user');
const Msg = require('../utils/message');

/* GET users listing. */
router.post('/signin', function (req, res) {
    let userNo = req.body.user_no;
    if (!userNo){
        res.send(new Msg(Msg.MSG_TYPE.FAIL,'user_no is not null.',null))
    }
    req.session.user_no = userNo;
    logger.info(userNo + '已登录...');
    res.send(new Msg(Msg.MSG_TYPE.SUCCESS,'sign in succeed.',null))
});

/* GET user information by user_no*/
router.get('/:user_no', (req, res) => {
    let userNo = req.param('user_no');
    if (req.session.user_no!=userNo){
        res.send(new Msg(Msg.MSG_TYPE.FAIL,'pls sign in first.',null))
    }else{
        DB.findOne('user', {user_no: userNo}, (err, data) => {
            if (err) {
                logger.error(err);
                res.send(new Msg(Msg.MSG_TYPE.ERROR,'server error.',null))
            } else {
                if (data)
                    res.send(new Msg(Msg.MSG_TYPE.SUCCESS,'success',data));
                else {
                    res.send(new Msg(Msg.MSG_TYPE.SUCCESS,'user is not exists.',null))
                }
            }
        })
    }

});

module.exports = router;
