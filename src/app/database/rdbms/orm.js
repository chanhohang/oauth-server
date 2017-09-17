'use strict';

import config from '../../util/configLoader'

import { getLogger } from '../../log/logger'
let logger = getLogger('orm')

import Sequelize from 'sequelize'

import UserVo from './entities/userVo'
import UserDao from './dao/userDao'

const sequelize = new Sequelize(config.database.name, config.database.username, config.database.password, {
    host: config.database.host,
    port: config.database.port,
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },

    logging: (str) => {
        logger.info(str)
    }
})

let rebuild = false
if (config.database.mode === 'rebuild') {
    rebuild = true
}

// Define DAO Here.
let userDao = new UserDao(sequelize).dao

export function testConnection() {
    sequelize
        .authenticate()
        .then(() => {
            logger.info('Connection has been established successfully.')
        })
        .catch(err => {
            logger.error('Unable to connect to the database:', err)
        })
}

export function connect(callback) {
    // force: true will drop the table if it already exists
    sequelize.sync({ force: rebuild }).then(() => {
        callback()
    })
}

export function close() {
    sequelize.close()
}

export function getUserDao() {
    return userDao
}