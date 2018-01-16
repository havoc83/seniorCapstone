var app = require('../app')
var express = require('express')
var router = express.Router()
var movies = require('./controller')


router.get('/', movies.moviesShow) //route add customer, get n post
router.get('/add', movies.moviesAdd)
router.post('/add', movies.moviesSave) //route delete customer
router.get('/delete/:id', movies.moviesDelete) //edit customer route , get n post
router.get('/edit/:id', movies.moviesEdit)
router.post('/edit/:id', movies.moviesEditSave)

module.exports = router
