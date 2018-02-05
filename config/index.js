/**
 * Created by WEI on 2018/2/5.
 */
const path=require('path');
let env=process.env.NODE_ENV || 'production';
env=env.toLowerCase();

const file=path.resolve(__dirname,env);
const config=module.exports=require(file);
