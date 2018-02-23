/**
 * Created by WEI on 2018/1/24.
 */
const log4js = require('log4js');

log4js.configure({
    appenders: {
        'access':{
            type: 'DateFile',
            filename: 'logs/access',
            pattern: '-yyyy-MM-dd.log',
            alwaysIncludePattern: true,
            category: 'access'
        }
    },
    categories:{
        default:{
            appenders:['access'],
            level:'info'
        }
    }
});

module.exports.getLogger = function(category) {
    return log4js.getLogger(category);
};


// const logger = log4js.getLogger('test');
// module.exports = logger;

// logger.trace('Entering cheese testing');
// logger.debug('Got cheese.');
// logger.info('Cheese is Gouda.');
// logger.warn('Cheese is quite smelly.');
// logger.error('Cheese is too ripe!');
// logger.fatal('Cheese was breeding ground for listeria.');

