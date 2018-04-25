'use strict'

import config from '../../util/configLoader'
import { getLogger } from '../../log/logger'
let logger = getLogger('mongo')

import mongoose from 'mongoose'

import UserVo from './entities/userVo'

const url = config.mongodb.url

function errorHandler() {
    logger.error('MongoDB connection error:')
}

class Mongo {
    constructor() {
        this.db = null
        this.UserModel = null
        this.mongoose = mongoose
    }

    connect(callback) {
        logger.info('Start connect:' + url)

        mongoose.connect(url, { });

        //Get the default connection
        this.db = mongoose.connection;

        //Bind connection to error event (to get notification of connection errors)
        this.db.on('error', errorHandler);

        this.db.on('connected', () => {
            logger.info('Mongoose default connection open to ' + url);
            callback() // Invoke Callback
        });

    }

    getUserModel() {
        // Compile model from schema
        var UserModel = mongoose.model('User', UserVo.schema);
        logger.info("User Collection created:")
        this.UserModel = UserModel
        return this.UserModel
    }

}

let mongo = new Mongo();

export default mongo