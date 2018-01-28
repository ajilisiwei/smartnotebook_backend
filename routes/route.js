const user=require('./../controller/user');
const note=require('./../controller/note');
const index=require('./../controller/index');
module.exports=function (app) {
    /* index */
    app.use('/',index);

    /* 用户相关的路由 */
    app.use('/user',user);

    /* 笔记相关的路由 */
    app.use('/note',note);

};