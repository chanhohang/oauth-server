'use strict';

import UserVo from '../entities/userVo';
import Sequelize from 'sequelize';

class UserDao {
    constructor(sequelize) {
        this.dao = sequelize.define( UserVo.tableName, UserVo.schema, UserVo.index);
    }
}

export default UserDao;