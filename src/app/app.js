'use strict';

const orm = require('./database/orm');
const logger = require('./log/logger').getLogger('app');
const mailer = require('./mail/mailer');

const express = require('express')
var browserify = require('browserify');
const React = require('react');
const ReactDOMServer = require('react-dom/server');
var DOMFactories = require('react-dom-factories');
var jsx = require('node-jsx')

const app = express()

// Make jsx files requirable.
jsx.install();

var Books = require('../views/index.jsx');

app.use(express.static('static'))

app.get('/', function (req, res) {
  var books = [{
    title: 'Professional Node.js',
    read: false
  }, {
    title: 'Node.js Patterns',
    read: false
  }];

  res.setHeader('Content-Type', 'text/html');
  res.send(ReactDOMServer.renderToStaticMarkup(
    DOMFactories.body(
      null,
      DOMFactories.div({
        id: 'app',
        dangerouslySetInnerHTML: {
          __html: ReactDOMServer.renderToString(React.createElement(Books, {
            data: books
          }))
        }
      }),
      DOMFactories.script({
        'id': 'initial-data',
        'type': 'text/plain',
        'data-json': JSON.stringify(books)
      }),
      DOMFactories.script({
        src: '/static/bundle.js'
      })
    )
  ));  
});

// app.get('/', function (req, res) {
//   res.send('Hello World!')
// })



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

    app.listen(3000, function () {
      logger.info('Example app listening on port 3000!');
    })
  });
}

orm.connect(main);