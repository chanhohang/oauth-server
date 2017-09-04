'use strict';

import Sequelize from 'sequelize';

class UserVo {
    constructor() {
        this.userId = null;
        this.firstName = null;
        this.lastName = null;
        this.password = null;
        this.password_salt = null;
        this.email = null;
    }

}

UserVo.tableName = 'user';
UserVo.schema = {
    userId: {
        type: Sequelize.BIGINT, autoIncrement: true, primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING
    },
    lastName: {
        type: Sequelize.STRING
    },
    password_salt: {
        type: Sequelize.STRING
    },
    password: {
        type: Sequelize.STRING
    },
    email: {
        type: Sequelize.STRING, unique: true, allowNull: false
    }
};
UserVo.index = {
    indexes: [
        {
            unique: true,
            fields: ['email']
        }
    ]
}

export default UserVo;
