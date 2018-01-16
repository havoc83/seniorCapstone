var express = require('express')
var router = express.Router()
var db = require('../app.js')

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index', { title: 'Brew City Rentals' })
})

router.get('/register', function (req, res, next) {
    res.render('register', { title: 'Account Registration' })
})

router.get('/login', function (req, res, next) {
    res.render('login', { title: 'Sign in to BCR' })
})

module.exports = router
