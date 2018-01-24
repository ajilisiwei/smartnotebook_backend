/**
 * Created by WEI on 2018/1/24.
 */
const log4js = require('log4js');
log4js.configure({
    appenders: {cheese: {type: 'file', filename: 'cheese.log'}},
    categories: {
        default: {
            appenders: ['cheese'], level: 'info'
        }
    }
});

const logger = log4js.getLogger('cheese');
module.exports = logger;

// logger.trace('Entering cheese testing');
// logger.debug('Got cheese.');
// logger.info('Cheese is Gouda.');
// logger.warn('Cheese is quite smelly.');
// logger.error('Cheese is too ripe!');
// logger.fatal('Cheese was breeding ground for listeria.');

