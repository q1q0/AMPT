var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

let { api } = require('./config');

let proposalsRouter = require('./routes/proposals');

let app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Credentials", 'true');
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')
    next()
})

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

let apiPrefix = "/api";
app.use(apiPrefix + '/proposals', proposalsRouter);

module.exports = app;
