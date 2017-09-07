'use strict'

import log4js from 'log4js' // include log4js
import config from '../util/configLoader'

log4js.configure({
    appenders: {
        everything: {
            type: 'dateFile',
            filename: config.logger.path,
            pattern: '-yyyy-MM-dd.log',
            alwaysIncludePattern: "true"
        }
    },
    categories: {
        default: { appenders: ['everything'], level: config.logger.level }
    }
})

const logger = log4js.getLogger()
const consoleEnabled = config.logger.consoleEnabled

module.exports = {
    getLogger: function (name) {
        return log4js.getLogger(name)
    },
    debug: function (...args) {
        const line = args.join()
        logger.debug(line)
        if (consoleEnabled) {
            console.log(line)
        }
    },
    info: function (...args) {
        const line = args.join()
        logger.info(line)
        if (consoleEnabled) {
            console.log(line)
        }
    },
    error: function (...args) {
        const line = args.join()
        logger.error(line)
        if (consoleEnabled) {
            console.log(line)
        }
    }
};

export function getLogger(name) {
    return log4js.getLogger(name)
}