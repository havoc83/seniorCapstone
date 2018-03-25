const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('transaction', { title: 'Process customer transactions' })
    req.on('submit', (data) => {
        data.emp_entry = req.cookies.user
        data.late_charges = parseFloat(data.late_charges) * -1
        console.log("Transaction submitted" + data)

        req.getConnection(function (err, connection) {
            connection.query('INSERT INTO transaction SET ?', data, function (err, rows) {
                if (err) {
                    console.log(data)
                    console.log("Error Inserting: %s", err)
                }
                else {
                    res.redirect("/movies")
                }
            })
        })
    })
})

router.get('/:id', (req, res) => {
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


router.post('/checkout', (req, res) => {
    console.log(req.body)
    req.getConnection(function (err, connection) {
        if (err) {
            console.log("Connection error in customer insert")
        }
        else {
            connection.query(`INSERT INTO transaction(dvdid,customerid,empid,due_date
            transaction_charges) VALUES(?,?,?,STR_TO_DATE(?, '%c/%e/%Y %r'),? FROM transaction WHERE customerid = ?);`,
                req.body.movieid, req.body.custid, req.cookies.user, req.body.due_date,
                req.body.trans_amount, req.body.custid, () => {
                    res.status(204).send()
                })
        }
    })
})


router.put('/checkin', (req, res) => {
    console.log(req.body)
    req.getConnection(function (err, connection) {
        if (err) {
            console.log("Connection error in transaction update")
        }
        else {
            connection.query(`UPDATE transaction SET returned_date = CURRENT_TIMESTAMP WHERE
                        customerid=? AND movieid=?`, req.body.custid, req.body.movieid, () => {
                res.status(204).send()
            })
        }
    })
})

module.exports = router
