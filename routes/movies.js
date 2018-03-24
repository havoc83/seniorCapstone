var app = require('../app')
var express = require('express')
var router = express.Router()


router.get('/', (req, res) => {
    req.getConnection(function (err, connection) {
        connection.query(`SELECT movieid, title,genre,language,CAST(length as CHAR(5)) AS length
        FROM movies`, function (err, rows) {
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
        title: input.title,
        genre: input.genre,
        release_year: input.year,
        length: input.len,
        language: input.lang,
        director: input.director,
        lead_role: input.role,
        emp_entry: req.cookies.user
    }
    req.getConnection(function (err, connection) {
        connection.query('INSERT INTO movies SET ?', data, function (err, rows) {
            if (err) {
                console.log(data)
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
        connection.query("DELETE FROM movies WHERE movieid = ?", [id], function (err, rows) {
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
        connection.query(`SELECT title,genre,release_year,CAST(length as CHAR(5)) AS length,language,
        director,lead_role FROM movies WHERE movieid = ?`, [id], function (err, rows) {
            if (err) {
                console.log("Error Selecting: %s", err)
            }
            else {
                console.log(rows)
                res.render('editMovies', { title: 'Edit movies', data: rows })
            }
        })
    })
})

router.post('/edit/:id', (req, res) => {
    const input = JSON.parse(JSON.stringify(req.body))
    const id = req.params.id
    const data = {
        title: input.title,
        genre: input.genre,
        release_year: input.year,
        length: input.len,
        language: input.lang,
        director: input.director,
        lead_role: input.role,
        emp_entry: req.cookies.user
    }
    req.getConnection(function (err, connection) {
        connection.query("UPDATE movies SET ? WHERE movieid = ?", [data, id], function (err, rows) {
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
