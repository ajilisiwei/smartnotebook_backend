const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
// const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const log4js = require('log4js');
const logger = require('./config/log4js');
const session = require('express-session');
const responseTime = require('response-time');
const routes = require('./routes/route');
const timeout = require('connect-timeout');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
// app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//设置session
app.use(session({
    secret: Math.random().toString(36).substr(2),
    cookie: {maxAge: 60 * 1000 * 30} // 过期时间（毫秒）
}));

// 使用请求计时模块
app.use(responseTime());

//设置日志模块
app.use(log4js.connectLogger(logger.getLogger('app.js'), {level: log4js.levels.INFO}));

//设置请求超时
app.use(timeout('5s'));

//设置路由
routes(app);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // send the error message
    res.status(err.status || 500);
    res.send({msg: res.locals.message});
});


module.exports = app;
