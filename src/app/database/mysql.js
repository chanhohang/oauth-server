'use strict';

const mysql = require('mysql');
var path = require('path');
var config = require(path.resolve('') + '/config/config.json')

var logger = require('../log/logger');

logger.info("create database connection with ", config.database.host, ", ", config.database.username, ", ", config.database.name);
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
            console.log('Connected!');
        });
    },
    close: function () {
        connection.end();
    }
};