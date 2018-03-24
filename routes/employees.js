const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) return
        connection.query('SELECT empid,firstname,lastname,email,phone FROM employees',
            (err, rows) => {
                if (err) {
                    console.log("Error Selecting : %s ", err)
                }
                else {
                    res.render('employees', { title: "BCR Employees", data: rows })
                }
            })
    })
}) //route add customer, get n post

router.get('/add', (req, res) => {
    res.render('addemployee', { title: "Add Employees" })
})

router.post('/add', function (req, res) {
    var input = JSON.parse(JSON.stringify(req.body))
    var data = {
        firstname: input.firstname,
        lastname: input.lastname,
        email: input.email,
        phone: input.phone,
        emp_entry: req.cookies.user
    }
    req.getConnection(function (err, connection) {
        connection.query('INSERT INTO employees SET ?', data, function (err, rows) {
            if (err) {
                console.log("Error Inserting: %s", err)
            }
            else {
                res.redirect("/employees")
            }
        })
    })
}) //route delete customer

router.get('/delete/:id', function (req, res) {
    var id = req.params.id
    req.getConnection(function (err, connection) {
        connection.query("DELETE FROM employees WHERE empid = ?", [id], function (err, rows) {
            if (err) {
                console.log("Error Deleting Row: %s", err)
            }
            else {
                res.redirect("/employees")
            }
        })
    })
}) //edit customer route , get n post

router.get('/edit/:id', function (req, res) {
    var id = req.params.id
    req.getConnection(function (err, connection) {
        connection.query('SELECT firstname,lastname,email,phone FROM employees WHERE empid = ?', [id], function (err, rows) {
            if (err) {
                console.log("Error Selecting: %s", err)
            }
            else {
                res.render('editEmployee', { title: 'Edit Employee', data: rows })
            }
        })
    })
})

router.post('/edit/:id', function (req, res) {
    var input = JSON.parse(JSON.stringify(req.body))
    var id = req.params.id
    var data = {
        firstname: input.firstname,
        lastname: input.lastname,
        email: input.email,
        phone: input.phone,
        emp_entry: req.cookies.user
    }
    req.getConnection(function (err, connection) {
        connection.query("UPDATE employees SET ? WHERE empid = ?", [data, id], function (err, rows) {
            if (err) {
                console.log("Error Updating: %s", err)
            }
            else {
                res.redirect("/employees")
            }
        })
    })
})

module.exports = router
