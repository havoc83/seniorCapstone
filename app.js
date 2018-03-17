//cd brewCityRentals/ &&  npm run dev
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const connection = require('express-myconnection')
const mysql = require('mysql')
const app = express()
const cookieParser = require('cookie-parser')
const dbinfo = require('./db.json')

app.use(connection(mysql, dbinfo, 'pool'))
// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')
app.use(cookieParser())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
const index = require('./routes/index')

//Add Routes

const authenticate = (req, res, next) => {
  if (req.cookies.token != undefined && req.cookies.token === index.token) {
    next()
  }
  else {
    console.log(index.token)
    res.render('login')
  }
}
app.use('/', index)
app.use('/reports', authenticate, require('./routes/reports'))
app.use('/transaction', authenticate, require('./routes/transaction'))
app.use('/employees', authenticate, require('./routes/employees'))
app.use('/movies', authenticate, require('./routes/movies'))
app.use('/customers', authenticate, require('./routes/customers'))

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
