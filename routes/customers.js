var express = require('express')
var router = express.Router()

router.get('/', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) {
            console.log("Error while selecting from customers table.")
        }
        connection.query(`SELECT custid,firstname,lastname,email,phone,address,
        city,state,zip FROM customers`,
            (err, rows) => {
                if (err) {
                    console.log("Error Selecting : %s ", err)
                }
                else {
                    res.render('customers', { title: "BCR customers", data: rows })
                }
            })
    })
})

router.get('/add', (req, res) => {
    res.render('addcustomer', { title: "Add Customer" })

})

router.post('/add', (req, res) => {
    var input = JSON.parse(JSON.stringify(req.body))
    var data = {
        firstname: input.firstname,
        lastname: input.lastname,
        email: input.email,
        phone: input.phone,
        address: input.address,
        city: input.city,
        state: input.state,
        zip: input.zip,
        emp_entry: req.cookies.user
    }
    req.getConnection(function (err, connection) {
        if (err) {
            console.log("Connection error in customer insert")
        }
        connection.query('INSERT INTO customers SET ?', data, function (err, rows) {
            if (err) {
                console.log("Error Inserting: %s", err)
            }
            else {
                res.redirect("/customers")
            }
        })
    })
})

router.get('/delete/:id', (req, res) => {
    var id = req.params.id
    req.getConnection(function (err, connection) {
        if (err) {
            console.log("Error deleting from customers database")
        }
        connection.query("DELETE FROM customers WHERE custid = ?", [id], function (err, rows) {
            if (err) {
                console.log("Error Deleting Row: %s", err)
            }
            else {
                res.redirect("/customers")
            }
        })
    })
})
router.get('/edit/:id', (req, res) => {
    var id = req.params.id
    req.getConnection(function (err, connection) {
        if (err) {
            console.log()
        }
        connection.query(`SELECT firstname,lastname,email,phone,address
        ,city,state,zip FROM customers WHERE custid = ?`, [id], function (err, rows) {
            if (err) {
                console.log("Error Selecting: %s", err)
            }
            else {
                res.render('editcustomer', { title: 'Edit Customer', data: rows })
            }
        })
    })
})
router.post('/edit/:id', (req, res) => {
    var input = JSON.parse(JSON.stringify(req.body))
    var id = req.params.id
    var data = {
        firstname: input.firstname,
        lastname: input.lastname,
        email: input.email,
        phone: input.phone,
        address: input.address,
        city: input.city,
        state: input.state,
        zip: input.zip,
        emp_entry: req.cookies.user
    }
    req.getConnection(function (err, connection) {
        if (err) {
            console.log("Failure to update customers table")
        }
        connection.query("UPDATE customers SET ? WHERE custid = ?", [data, id], function (err, rows) {
            if (err) {
                console.log("UPDATE customers SET ? WHERE custid = ?", [data, id])
                console.log("Error Updating: %s", err)
            }
            else {
                res.redirect("/customers")
            }
        })
    })
})
module.exports = router
