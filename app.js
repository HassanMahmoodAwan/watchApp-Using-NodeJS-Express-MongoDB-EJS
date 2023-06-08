var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var expressLayouts = require("express-ejs-layouts");
var mongoose = require("mongoose");
var session = require("express-session");
var sessionAuth = require("./middlewares/sessionAuth");


var indexRouter = require('./routes/index');
var productRouter = require('./routes/product');

var app = express();
app.use(
  session({
    secret: "dummyText", 
    cookie: { maxAge: 60000 }
  })
);
app.use(expressLayouts);
app.use(sessionAuth);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/', productRouter);

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

// Connecting DataBase.
mongoose.connect("mongodb://127.0.0.1/watchApp", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(message=>{
  console.log("MongoDB is connected to dataBase");
}).catch(err=>{
  console.log("Error in Connected to MongoDB");
  console.log(err);
});



module.exports = app;
