'use strict';

const express = require('express')
const app = express()
const logger = require('./log/logger')
const mysql = require('./database/mysql')

app.get('/', function (req, res) {
  res.send('Hello World!')
})

mysql.connect();

app.listen(3000, function () {  
  logger.info('Example app listening on port 3000!');
})