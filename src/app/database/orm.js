var path = require('path');
var config = require(path.resolve('') + '/config/config.json')
var logger = require('../log/logger');

var Sequelize = require('sequelize');

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

module.exports = {
    connect: function () {
        sequelize
            .authenticate()
            .then(() => {
                logger.info('Connection has been established successfully.');
            })
            .catch(err => {
                logger.error('Unable to connect to the database:', err);
            });
    },
    close: function () {
        sequelize.close();
    },
    test: function () {
        const User = sequelize.define('user', {
            firstName: {
                type: Sequelize.STRING
            },
            lastName: {
                type: Sequelize.STRING
            }
        });

        // force: true will drop the table if it already exists
        User.sync({ force: false }).then(() => {
            // Table created
            return User.create({
                firstName: 'John',
                lastName: 'Hancock'
            });
        });

        User.findAll().then(users => {
            logger.info(users)
        })
    }
};

