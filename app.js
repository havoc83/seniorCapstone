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

//Add Routes

const authenticate = (req, res, next) => {
  if (req.cookies.token != undefined) {
    req.getConnection((err, conn) => {
      if (err) {
        console.log('Could not connect to the database')
      }
      else {
        conn.query(`SELECT token FROM employees WHERE email = '${req.cookies.user}';`, (err, rows) => {
          if (err) {
            console.log("There was an errror while retreiving token from employees table")
          }
          else {
            if (rows[0]["token"] === req.cookies.token) {
              next()
            }
            else {
              res.redirect('/login')
            }
          }
        })
      }
    })
  }
  else {
    res.redirect('/login')
  }
}

app.use('/', require('./routes/index'))
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
