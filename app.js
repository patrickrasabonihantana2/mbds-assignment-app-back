var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jsend = require('jsend');
const corsSecurity = require('./src/middlewares/cors');

var indexRouter = require('./routes/index');
var apiRouter = require('./src/routes/api');
var authRouter = require('./src/routes/auth');

var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(jsend.middleware);

// CORS
app.use(corsSecurity);

app.use('/', indexRouter);
app.use('/api', apiRouter);
app.use('/auth', authRouter);

module.exports = app;
