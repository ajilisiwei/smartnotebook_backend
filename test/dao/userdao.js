/**
 * Created by WEI on 2018/1/25.
 */
const assert = require('assert');
const MongoDB=require('../../utils/mongodb.js');

describe('User', function() {
    describe('1.add a user', function() {
        it('should save without error', function(done) {
            const now=new Date();
            const user_id=Math.floor(Math.random()*1000+1);
            const user={user_id:user_id,user_name:'wei',created_at:now,created_by:1,last_updated_at:now,last_updated_by:1};
            MongoDB.save('user',user,(err, res)=>{
                if (err) throw err;
                done();
            });
        });
    });

    let theUser={};
    describe('1.find a user', function() {
        it('should find without error', function(done) {
            const condition={user_id:1};
            MongoDB.findOne('user',condition,(err, res)=>{
                if (err) throw err;
                theUser=res;
                done();
            });
        });
    });

    describe('1.update a user', function() {
        it('should update without error', function(done) {
            const now=new Date();
            const condition={_id:theUser._id,user_id:1};
            const update_fields={user_name:'weiwei',user_num:'D001',last_updated_by:1,last_updated_at:now};
            MongoDB.update('user',condition,update_fields,(err, res)=>{
                if (err) throw err;
                done();
            });
        });
    });
});
