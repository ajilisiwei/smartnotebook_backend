const express = require('express');
const router = express.Router();
const DB = require('../utils/mongodb');
const T_USER = 'user';
const logger = require('../config/log4js').getLogger(T_USER);
const Msg = require('../utils/message');
const Promise = require("bluebird");

/* POST user sign in. */
router.post('/signin', function (req, res) {
    _signIn(req, res);
});

/* GET user information by user_id*/
router.get('/:user_id', (req, res) => {
    let userId = req.param('user_id');
    if (req.session.user_id != userId) {
        res.send(Msg.Fail('pls sign in first.'))
    } else {
        new Promise((resolve, reject) => {
            DB.findOne(T_USER, {_id: userId}, (err, data) => {
                if (err) reject(err);
                else  resolve(data);
            })
        }).then((data) => {
            if (data) res.send(Msg.Success(null, data));
            else res.send(Msg.Fail('user is not exists.'))
        }).catch((err) => {
            logger.error(err);
            res.send(Msg.Error());
        });
    }
});

/* POST update a user */
router.post('/',(req,res)=>{
    let user = req.body;
    let userId=req.session.user_id;
    if (!user || !user.user_id || user.user_id.length<1) {
        res.send(Msg.Fail('user or user_id is null.'))
    }
    if(!userId && userId!=user.user_id){
        res.send(Msg.Fail('pls sign in first.'))
    }

    user.last_updated_at=new Date();

    DB.updateData(T_USER,{_id:userId},user,(err,data)=>{
        if(err) {
            logger.error(err);
            res.send(Msg.Error());
        }else {
            if(data)
                res.send(Msg.Success(null,data));
            else
                res.send(Msg.Fail('unknown reason.'))
        }
    })
});


/**
 * 登录操作
 * @param req
 * @param res
 */
async function _signIn(req, res) {
    let userNo = req.body.user_no;
    if (!userNo) {
        res.send(Msg.Fail('user_no is null.'))
    }
    let user = await _findOne(userNo);
    if (user) {
        req.session.user_id = user._id;
        res.send(Msg.Success('sign in succeed.', user));
    } else {
        let now = new Date();
        user = {
            user_no: userNo,
            created_at: now,
            last_updated_at: now
        };
        user = await _saveOne(user);
        if (user) {
            req.session.user_id = user._id;
            res.send(Msg.Prompt('you are first sign,pls set your access no.', user));
        } else {
            res.send(Msg.Fail('add user failed.'))
        }

    }
}


/**
 * 查找用户
 * @param userNo 用户编码
 */
function _findOne(userNo) {
    return new Promise((resolve, reject) => {
        DB.findOne(T_USER, {user_no: userNo}, (err, data) => {
            if (err) reject(err);
            else  resolve(data);
        })
    }).then((data) => {
        if (data) return data;
        return null;
    }).catch((err) => {
        logger.error(err);
        return null;
    });
}


/**
 * 新增用户
 * @param user 用户
 */
function _saveOne(user) {
    return new Promise((resolve, reject) => {
        DB.save(T_USER, user, (err, data) => {
            if (err) reject(err);
            else  resolve(data);
        })
    }).then((data) => {
        if (data) return data;
        return null;
    }).catch((err) => {
        logger.error(err);
        return null;
    });
}

module.exports = router;
