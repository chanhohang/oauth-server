'use strict';

require('import-export');
const orm = require('./database/orm');
const logger = require('./log/logger').getLogger('app');
const mailer = require('./mail/mailer');
const express = require('express');
const serverRoute = require('./core/serverRoute');


// GUI
const next = require('next');
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dir: './src/pages', dev });
const handle = app.getRequestHandler();

function nextjsServer() {
  app.prepare().then(() => {
    const server = express();

    // Register Server Route here.
    serverRoute(server);

    server.get('*', (req, res) => {
      handle(req, res)
    })

    server.listen(3000)
  });

};

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
process.on('SIGINT', exitHandler.bind(null, { exit: true }));
process.on('uncaughtException', exitHandler.bind(null, { exit: true }));

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

    nextjsServer();
  });
}

orm.connect(main);