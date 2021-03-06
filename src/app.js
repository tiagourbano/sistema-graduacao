'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();

// Connecta ao banco
mongoose.connect(config.connectionString, {
    useMongoClient: true
});

// Carrega os Models
const Belt = require('./models/belt');
const User = require('./models/user');
const Blow = require('./models/blow');
const Exam = require('./models/exam');

// Carrega as Rotas
const indexRoute = require('./routes/index-route');
const beltRoute = require('./routes/belt-route');
const userRoute = require('./routes/user-route');
const blowRoute = require('./routes/blow-route');
const examRoute = require('./routes/exam-route');

app.use(bodyParser.json({
  limit: '5mb'
}));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Habilita o CORS
app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  next();
});

app.use('/', indexRoute);
app.use('/belts', beltRoute);
app.use('/users', userRoute);
app.use('/blows', blowRoute);
app.use('/exams', examRoute);

module.exports = app;
