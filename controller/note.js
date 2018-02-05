/**
 * Created by WEI on 2018/1/27.
 */
const express = require('express');
const router = express.Router();
const DB = require('../utils/mongodb');
const T_NOTE = 'note';
const logger = require('../config/log4js').getLogger(T_NOTE);
const Msg = require('../utils/message');

const SIGN_IN_WARN_STR = 'pls sign in first.';


/* GET get notes by user_id. */
router.get('/list', (req, res) => {
    let pageIndex=req.query.pageIndex;
    let pageSize=req.query.pageSize;
    let options={
        pageIndex:pageIndex,
        pageSize:pageSize,
        sort:{created_at:-1},
        fields:'_id title content user_id'
    };
    let user_id = req.session.user_id;
    if (!user_id) res.send(Msg.Fail(SIGN_IN_WARN_STR));
    DB.findByPager(T_NOTE, {user_id: user_id}, options, (err, data) => {
        if (err) {
            logger.error(err);
            res.send(Msg.Error());
        }
        else res.send(Msg.Success(null, data));
    })
});


/* POST create / update a note. */
router.post('/', (req, res) => {
    let user_id = req.session.user_id;
    if (!user_id) {
        res.send(Msg.Fail(SIGN_IN_WARN_STR));
    }
    else {
        let note = req.body;
        let noteModel={};
        if (note.title || note.title.length > 0) {
            noteModel.title = note.title;
        }
        let now=new Date();
        noteModel.last_updated_at = now;
        noteModel.content=note.content;
        if (!note.note_id) {
            noteModel.created_at=now;
            noteModel.user_id = user_id;
            DB.save(T_NOTE, noteModel, (err, data) => {
                if (err) {
                    logger.error(err);
                    res.send(Msg.Error());
                }
                else  res.send(Msg.Success(null, data));
            })
        } else {
            DB.updateData(T_NOTE, {_id: note.note_id, user_id: user_id}, noteModel, (err, data) => {
                if (err) {
                    logger.error(err);
                    res.send(Msg.Error());
                }
                else  res.send(Msg.Success(null, data));
            })
        }

    }

});


module.exports = router;