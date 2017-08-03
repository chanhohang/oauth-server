'use strict';

var path = require('path');
var config = require(path.resolve('') + '/config/config.json')

var log4js = require('log4js'); // include log4js

log4js.configure({
  appenders: {
    everything: { type: 'file', filename: config.logger.path }
  },
  categories: {
    default: { appenders: [ 'everything' ], level: config.logger.level }
  }
});

const logger = log4js.getLogger();
const consoleEnabled = config.logger.consoleEnabled;

module.exports = {
    getLogger: function(name) {
      return log4js.getLogger(name);
    },
    debug: function (...args) {
        const line = args.join();
        logger.debug(line);
        if (consoleEnabled) {
            console.log(line);
        }
    },
    info: function (...args) {
        const line = args.join();
        logger.info(line);
        if (consoleEnabled) {
            console.log(line);
        }
    },
    error: function (...args) {
        const line = args.join();
        logger.error(line);
        if (consoleEnabled) {
            console.log(line);
        }        
    }
};