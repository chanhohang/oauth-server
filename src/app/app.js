'use strict';

const orm = require('./database/orm');
const logger = require('./log/logger').getLogger('app')

const express = require('express')

const app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

logger.info("###### Oauth Server Initilization ######");

function exitHandler(options, err) {
  if (options.cleanup) {
    logger.info('clean');
  }
  if (err) {
    logger.error(err);
  }
  if (options.exit) {
    logger.info("Process terminated by Shutdown Signal!")
    process.exit();
  }
}

//do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }));
process.on('SIGINT', exitHandler.bind(null, {exit:true}));
process.on('uncaughtException', exitHandler.bind(null, {exit:true}));

function main() {

  let userDao = orm.getUserDao();
  let result = userDao.create({
    firstName: 'John',
    lastName: 'Hancock',
    // password: 'password',
    // password_salt: 'salt',
    email: 'john.hancock@fake.com'
  });

  result.then(() => {
    userDao.findAll().then(function (users) {
      users.forEach(function (user) {
        logger.info(user.userId + "," + user.email);
      }, this);
    });

    app.listen(3000, function () {
      logger.info('Example app listening on port 3000!');
    })
  });
}

orm.connect(main);