var app = require('../app')
var express = require('express')
var router = express.Router()
var customers = require('./controller')


router.get('/', customers.custShow) //route add customer, get n post
router.get('/add', customers.custAdd)
router.post('/add', customers.custSave) //route delete customer
router.get('/delete/:id', customers.custDelete) //edit customer route , get n post
router.get('/edit/:id', customers.custEdit)
router.post('/edit/:id', customers.custEditSave)

module.exports = router