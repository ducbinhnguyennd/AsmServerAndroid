var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session')

var settingsRouter = require('./routes/settings.route');
var homeRouter = require('./routes/home.route');
var accountsRouter = require('./routes/accounts.route');
var theloaiRouter = require('./routes/theloai.route');
var apiAccRouter = require('./routes/acc.api');
var apiTlRouter = require('./routes/theloai.api');
var apSpRouter = require('./routes/sanpham.api');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.use(session({
  secret: 'adscascd8saa8sdv87ds78v6dsv87asvdasv8',
  resave: false,
  saveUninitialized: true
  // ,cookie: { secure: true }
}))


app.use('/', settingsRouter);
app.use('/home', homeRouter);
app.use('/accounts', accountsRouter);
app.use('/theloai', theloaiRouter);
app.use('/api', apSpRouter);
app.use('/api', apiAccRouter);
app.use('/api', apiTlRouter);


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
 // res.render('error');
 console.log(err);
});


console.log('http://localhost:3000');

module.exports = app;
