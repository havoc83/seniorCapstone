//cd brewCityRentals/ &&  npm run dev

const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const connection = require('express-myconnection')
const mysql = require('mysql')
const app = express()
const dbinfo = require('./db.json')



app.use(connection(mysql, dbinfo, 'pool'))
var index = require('./routes/index')
var employees = require('./routes/employees')
var movies = require('./routes/movies')
var customers = require('./routes/customers')

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//Add Routes
app.use('/', index)
app.use('/employees', employees)
app.use('/movies', movies)
app.use('/customers', customers)

app.use(express.static(path.join(__dirname, 'public')))

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
