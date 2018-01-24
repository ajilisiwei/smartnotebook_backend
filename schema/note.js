/**
 * Created by WEI on 2018/1/24.
 */

/**
 * 笔记的schema
 * */
const mongoose =require('mongoose');
const noteSchema=new mongoose.schema({
    title : { type:String, required: true},//标题,类型为String
    content  : { type:String },//属性content,类型为String
    category: {
        type: ObjectId,
        ref: 'category' //关联category表的_id
    },
    created_at : { type:Date, default:Date.now },
    created_by : { type:ObjectId,ref:'user'}, //关联user表的_id
    last_updated_at : { type:Date },
    last_updated_by : { type:ObjectId,ref:'user'},
    status:{type:Number}
});

module.exports=noteSchema;
