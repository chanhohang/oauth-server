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
    debug: function (...args) {
        logger.debug(args);
        if (consoleEnabled) {
            console.log(args);
        }
    },
    info: function (...args) {
        logger.info(args);
        if (consoleEnabled) {
            console.log(args);
        }
    }
};