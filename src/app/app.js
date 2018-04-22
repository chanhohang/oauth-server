'use strict'

require('import-export')

const express = require('express')
const bodyParser = require('body-parser');
const multer = require('multer'); // v1.0.5
const morgan = require('morgan')

const orm = require('./database/rdbms/orm')
const mongo = require('./database/mongodb/mongo')
const logger = require('./log/logger').getLogger('app')
const mailer = require('./mail/mailer')
const serverRoute = require('./core/serverRoute')
const clientRoute = require('./core/clientRoute')
const StringUtil = require('./util/stringUtil')
const log4js = require('./log/logger')
const MorganStream = require('./log/morganStream')

// GUI
const next = require('next')
// Nextjs
const dev = process.env.NODE_ENV !== 'production'
// const app = next({ dir: './src/pages', dev })
const app = next({ dev })
//i18n
const i18nextMiddleware = require('i18next-express-middleware');
const Backend = require('i18next-node-fs-backend');
const i18n = require('./i18n');
//GraphQL
const { graphqlExpress, graphiqlExpress } = require('apollo-server-express');
const setupGraphql = require('./core/graphql/setupGraphql');

const handle = app.getRequestHandler()

let appStarted = false
function nextjsServer() {
  if (appStarted) {
    logger.info('Server already started.')
    return
  }
  appStarted = true;

  // Initialize i18n before start servers.
  i18n.use(Backend).use(i18nextMiddleware.LanguageDetector).init({
    preload: ['en', 'zh_HK'],
    ns: ['common'],
    backend: {
      loadPath: __dirname + '/locales/{{lng}}/{{ns}}.json',
      addPath: __dirname + 'locales/{{lng}}/{{ns}}.missing.json'
    }
  }, () => {
    app.prepare().then(() => {
      const server = express()

      // MiddleWare start
      const upload = multer(); // for parsing multipart/form-data
      server.use(bodyParser.json()); // for parsing application/json
      server.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
      const accessLogStream = new MorganStream()
      server.use(morgan('combined', { stream: accessLogStream }))
      server.use(i18nextMiddleware.handle(i18n)) // i18n middleware
      // Middleware end

      // i18n config
      server.use('/locales', express.static('./locales'))
      server.post('/locales/add/:lng/:ns', i18nextMiddleware.missingKeyHandler(i18n))

      // Register Server Route here.
      serverRoute(server)

      // Register Client Route here.
      clientRoute(server, app)

      // Put together a schema
      const myGraphQLSchema = setupGraphql();

      // The GraphQL endpoint
      server.use('/graphql', bodyParser.json(), graphqlExpress(req => {
        return {
          schema: myGraphQLSchema,
          context: {
            value: req.body.something,
          },
          // TODO other options here
          // This is useful if you need to attach objects to your context on a per-request basis, 
          // for example to initialize user data, caching tools like dataloader, or set up some API keys.
        };
      }));

      // GraphiQL, a visual editor for queries
      server.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

      server.get('*', (req, res) => {
        handle(req, res)
      })

      let port = 3000
      server.listen(port)
      logger.info('Server is listening on port:' + port)
    })

  })

}

logger.info("###### Oauth Server Initilization ######")

function exitHandler(options, err) {
  if (options.cleanup) {
    logger.info('clean')
  }
  if (err) {
    logger.fatal(err)
    console.error(err)
  }
  if (options.exit) {
    logger.info("Process terminated by Shutdown Signal!")
    log4js.shutdown() // Instead of Process.exit, we wait the logger to shutdown first.
  }
}

//do something when app is closing
process.on('exit', exitHandler.bind(null, { cleanup: true }))
process.on('SIGINT', exitHandler.bind(null, { exit: true }))
process.on('uncaughtException', err => exitHandler({ exit: true }, err))

function main() {

  let userDao = orm.getUserDao()
  let result = userDao.create({
    firstName: 'John',
    lastName: 'Hancock',
    // password: 'password',
    // password_salt: 'salt',
    email: 'john.hancock@fake.com'
  })

  result.then(() => {
    userDao.findAll().then(function (users) {
      users.forEach(function (user) {
        logger.info(user.userId + "," + user.email)
      }, this)
    })

    nextjsServer()
  })
}

orm.connect(main)

function mongoMain() {
  nextjsServer()
  try {
    let UserModel = mongo.getUserModel();
    const user = { userId: 'davidjones', lastName: 'random', email: 'davidjones@davidjones.com' }

    UserModel.find({}, function (err, docs) {
      if (err) logger.error(err)
      logger.info(docs)
    });

    UserModel.findOneAndUpdate(
      { userId: user.userId }, user, { upsert: true, setDefaultsOnInsert: true, new: true },
      (err, user) => {
        if (err) logger.error(err)
        logger.info(user._id + ' is saved.' + user)
      });
  } catch (err) {
    logger.error(err)
  }
}

mongo.connect(mongoMain)

