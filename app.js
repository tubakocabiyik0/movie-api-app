var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose=require('mongoose');
const bodyParser = require('body-parser');
const config=require('./config');
const middleware=require('./middleware/verify-token');

var indexRouter = require('./routes/index');
var movieRouter = require('./routes/movie');
var directorRouter = require('./routes/directors');
var userRouter=require('./routes/users');

var app = express();

mongoose.connect('mongodb://localhost/movie-app',{useNewUrlParser:true}).then(()=>{
  console.log("its okey");
}).catch((err)=>{
  console.log(err);
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.set('apiSecretKey',config.api_secret_key);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());



app.use('/', indexRouter);
app.use('/api',middleware);
app.use('/api/movie', movieRouter);
app.use('/api/director', directorRouter);
app.use('/',userRouter);

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
  res.json({error:{message:err.message,code:err.code}});
});

module.exports = app;
