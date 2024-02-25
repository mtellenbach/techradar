const createError = require('http-errors');
const express = require('express');
const bodyParser = require('body-parser');
require('dotenv').config();
const mongoose = require('mongoose');

const db = mongoose.connection;

const uri = process.env.MONGODB_URI;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

mongoose.connect(uri, clientOptions);

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('Database connected successfully');
});

const usersRouter = require('./routes/user');
const organisationsRouter = require('./routes/organisation');
const technologiesRouter = require('./routes/technology');

const app = express();

app.use(express.json());
app.use(bodyParser.json())

app.use('/users', usersRouter);
app.use('/organisations', organisationsRouter);
app.use('/technologies', technologiesRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
