'use strict';

var UserVo = require('../entities/userVo')
var Sequelize = require('sequelize');

class UserDao {
    constructor(sequelize) {
        this.dao = sequelize.define( UserVo.tableName, UserVo.schema, UserVo.index);
    }
}

module.exports = UserDao;