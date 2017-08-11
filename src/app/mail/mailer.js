'use strict';

const nodemailer = require('nodemailer');

var path = require('path');
var config = require(path.resolve('') + '/config/config.json')

var password = config.mailer.password;
var username = config.mailer.username;
var host = config.mailer.host;
var port = config.mailer.port;

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: host,
    port: port,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: username,
        pass: password
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"Administrator" <' + username + '>', // sender address
    to: 'sfatfat@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
if (password != '') {
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
    });
}