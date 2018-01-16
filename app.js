//cd brewCityRentals/ && SET DEBUG = brewCityRentals: * & npm run devstart

var express = require('express')
var path = require('path')
//var favicon = require('serve-favicon')
var logger = require('morgan')
var cookieParser = require('cookie-parser')
var bodyParser = require('body-parser')
var connection = require('express-myconnection')
var mysql = require('mysql')
var app = express()
var dbinfo = require('./db.json')
var expressSession = require('express-session')
var expressValidator = require('express-validator')

app.use(connection(mysql, dbinfo, 'pool'))
var index = require('./routes/index')
//var login = require('./routes/login')
var employees = require('./routes/employees')
var movies = require('./routes/movies')


// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use(expressValidator())
app.use(expressSession({ secret: 'BrewCityRentals', saveUninitialized: false, resave: false }))
app.use('/', index)
//app.use('/login', login)
app.use('/employees', employees)
app.use('/movies', movies)
//app.use('/transaction', transaction)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
