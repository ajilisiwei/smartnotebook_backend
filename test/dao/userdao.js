/**
 * Created by WEI on 2018/1/25.
 */
const assert = require('assert');
const MongoDB=require('../../utils/mongodb.js');

describe('User', function() {
    const user_no=Math.floor(Math.random()*1000+1);
    let theUser={};
    describe('1.add a user', function() {
        it('should save without error', function(done) {
            const now=new Date();        
            const user={user_no:user_no,user_name:'wei',created_at:now,last_updated_at:now};
            MongoDB.save('user',user,(err, res)=>{
                if (err) throw err;
                done();
            });
        });
    });

    describe('2.find a user', function() {
        it('should find without error', function(done) {
            const condition={user_no:user_no};
            MongoDB.findOne('user',condition,(err, res)=>{
                if (err) throw err;
                theUser=res;
                done();
            });
        });
    });

    describe('3.update a user', function() {
        it('should update without error', function(done) {
            const now=new Date();
            const condition={_id:theUser._id};
            const update_fields={user_name:'weiwei',user_no:'D001',last_updated_at:now};
            MongoDB.update('user',condition,update_fields,(err, res)=>{
                if (err) throw err;
                done();
            });
        });
    });

    describe('4.remove a user', function() {
        it('should remove without error', function(done) {
            const now=new Date();
            const condition={_id:theUser._id};
            MongoDB.remove('user',condition,(err, res)=>{
                if (err) throw err;
                done();
            });
        });
    });
});
