'use strict';

const mysql = require('mysql2');
var path = require('path');
var config = require(path.resolve('') + '/config/config.json')

var logger = require('../log/logger').getLogger('mysql');

logger.info("create database connection with host:" + config.database.host, 'username:' + config.database.username, 'database:' + config.database.name);
const connection = mysql.createConnection({
    host: config.database.host,
    user: config.database.username,
    password: config.database.password,
    database: config.database.name
});


module.exports = {
    connect: function () {
        connection.connect((err) => {
            if (err) throw err;
            logger.info('Connected!');
        });
    },
    close: function () {
        connection.end();
    }
};