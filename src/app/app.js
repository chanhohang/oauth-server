'use strict';

//const mysql = require('./database/mysql')
const orm = require('./database/orm');
const logger = require('./log/logger').getLogger('app')

const express = require('express')

const app = express()

app.get('/', function (req, res) {
  res.send('Hello World!')
})

//mysql.connect();

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