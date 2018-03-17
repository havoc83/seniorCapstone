const express = require('express')
const router = express.Router()

router.get('/transaction', (req, res) => {
    res.render('transaction', { title: 'Process customer transactions' })
    req.on('submit', (data) => {
        console.log("Transaction submitted" + data)
    })
})

router.get('/transaction/:id', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) {
            console.log("Connection error in customer table")
        }
        else {
            connection.query('SELECT coalesce(SUM(late_charges),0) AS fee from transaction where customerid = ?', req.params.id,
                (err, rows) => {
                    if (err) {
                        console.log("Error when querying from transaction table")
                    }
                    else {
                        res.send(JSON.stringify(rows))
                    }
                })

        }
    })
})


router.post('/transaction', (req, res) => {

    req.getConnection(function (err, connection) {
        if (err) {
            console.log("Connection error in customer insert")
        }
        connection.query("SELECT 1 from customers WHERE custid=?", req.body.custid, function (err, rows) {
            if (err) {
                console.log("Select Error: %s", err)
            }
            else if (rows.length === 0) {
                res.send(JSON.stringify({ body: "Customer Not Found" }))
            }
            else {
                connection.query("SELECT 1 from dvd WHERE dvdid=?", req.body.dvd, function (err, rows) {
                    if (err) {
                        console.log("Select Error: %s", err)
                    }
                    else if (rows.length === 0) {
                        res.send(JSON.stringify({ body: "DVD ID Not Found" }))
                    }

                    else {
                        connection.query(`INSERT INTO transaction(dvdid,customerid,empid,due_date
                        transaction_charges) VALUES(?,?,?,STR_TO_DATE(?, '%c/%e/%Y %r'),? FROM transaction WHERE customerid = ?);`,
                            req.body.dvd, req.body.custid, req.body.empid, req.body.due,
                            req.body.amount, () => {
                                res.status(204).send()
                            })

                        connection.query("UPDATE transaction SET late_charges = 0 WHERE customerid = ?", req.body.custid,
                            (err, rows) => {
                                if (err) {
                                    console.log('Error updating customer late payments')
                                }
                                else {
                                    console.log('Number of rows updated ' + rows.length)
                                }
                            })
                    }
                })
            }
        })

    })
    console.log(req.body)
})


router.put('/transaction', (req, res) => {

    req.getConnection(function (err, connection) {
        if (err) {
            console.log("Connection error in transaction update")
        }
        connection.query("SELECT 1 from transaction WHERE custid=? AND dvdid=? AND returned_date IS NULL",
            req.body.custid, req.body.dvd,
            function (err, rows) {
                if (err) {
                    console.log("Select Error: %s", err)
                }
                else if (rows.length === 0) {
                    res.send(JSON.stringify({ body: "Customer has not checked out this movie" }))
                }
                else {
                    connection.query(`UPDATE transaction SET returned_date = CURRENT_TIMESTAMP WHERE
                        custid=? AND dvdid=?`, req.body.custid, req.body.dvd, () => {
                        res.status(204).send()
                    })
                }
            })

    })
    console.log(req.body)
})

module.exports = router
