'use strict';

var path = require('path');
var config = require(path.resolve('') + '/config/config.json')
var logger = require('../log/logger').getLogger('orm');

var Sequelize = require('sequelize');

const UserVo = require('./entities/userVo');
const UserDao = require('./dao/userDao');

const sequelize = new Sequelize(config.database.name, config.database.username, config.database.password, {
    host: config.database.host,
    port: config.database.port,
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    },
});

var rebuild = false;
if (config.database.mode === 'rebuild') {
    rebuild = true;
}

// Define DAO Here.
var userDao = new UserDao(sequelize).dao;

module.exports = {
    testConnection() {
        sequelize
            .authenticate()
            .then(() => {
                logger.info('Connection has been established successfully.');
            })
            .catch(err => {
                logger.error('Unable to connect to the database:', err);
            });
    },
    connect: function (callback) {
        // force: true will drop the table if it already exists
        sequelize.sync({ force: rebuild }).then(() => {
            callback();
        })
    },
    close: function () {
        sequelize.close();
    },
    getUserDao: function () {
        return userDao;
    }
};

