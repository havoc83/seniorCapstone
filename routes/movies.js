var app = require('../app')
var express = require('express')
var router = express.Router()


router.get('/', (req, res) => {
    req.getConnection(function (err, connection) {
        connection.query('SELECT * FROM movies', function (err, rows) {
            if (err) {
                console.log("Error Selecting : %s ", err)
            }
            else {
                res.render('movies', { title: "BCR movies", data: rows })
            }
        })
    })
}) //route add customer, get n post

router.get('/add', (req, res) => {
    res.render('addmovie', { title: "Add Movies" })
})

router.post('/add', (req, res) => {
    const input = JSON.parse(JSON.stringify(req.body))
    const data = {
        fname: input.firstname,
        lname: input.lastname,
        email: input.email,
        phone: input.phone
    }
    req.getConnection(function (err, connection) {
        connection.query('INSERT INTO movies SET ?', data, function (err, rows) {
            if (err) {
                console.log("Error Inserting: %s", err)
            }
            else {
                res.redirect("/movies")
            }
        })
    })
}) //route delete customer

router.get('/delete/:id', (req, res) => {
    const id = req.params.id
    req.getConnection(function (err, connection) {
        connection.query("DELETE FROM movies WHERE empid = ?", [id], function (err, rows) {
            if (err) {
                console.log("Error Deleting Row: %s", err)
            }
            else {
                res.redirect("/movies")
            }
        })
    })
}) //edit customer route , get n post

router.get('/edit/:id', (req, res) => {
    const id = req.params.id
    req.getConnection(function (err, connection) {
        connection.query('SELECT * FROM movies WHERE movieid = ?', [id], function (err, rows) {
            if (err) {
                console.log("Error Selecting: %s", err)
            }
            else {
                res.render('editMovies', { title: 'Edit movies', data: rows })
            }
        })
    })
})

router.post('/edit/:id', (req, res) => {
    const input = JSON.parse(JSON.stringify(req.body))
    const id = req.params.id
    const data = {
        fname: input.firstname,
        lname: input.lastname,
        email: input.email,
        phone: input.phone
    }
    req.getConnection(function (err, connection) {
        connection.query("UPDATE Movies SET ? WHERE ?", [data, id], function (err, rows) {
            if (err) {
                console.log("Error Updating: %s", err)
            }
            else {
                res.redirect("/movies")
            }
        })
    })
})

module.exports = router
