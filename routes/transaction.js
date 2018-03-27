const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('transaction', { title: 'Process customer transactions' })
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
    const dueDate = req.body.due_date
    const data = {
        movieid: req.body.movieid,
        customerid: req.body.custid,
        due_date: dueDate.substring(6, 10) + '-' + dueDate.substring(0, 2) + '-' + dueDate.substring(3, 5),
        trans_amount: req.body.trans_amount,
        late_charges: 0,
        emp_entry: req.cookies.user,
        check_num: req.body.check_num,
        credit_num: req.body.credit_num,
        credit_exp: req.body.credit_exp
    }
    console.log(data.due_date)
    req.getConnection(function (err, connection) {
        if (err) {
            console.log("Connection error in customer insert")
        }
        else {
            connection.query(`INSERT INTO transaction SET ?`, data, (err, rows) => {
                if (err) {
                    console.log(data, err)
                }
                else {
                    res.status(204).send()
                }

            })
        }
    })
})


router.put('/checkin', (req, res) => {
    req.getConnection(function (err, connection) {
        if (err) {
            console.log("Connection error in transaction update")
        }
        else {
            connection.query(`UPDATE transaction SET returned_date = CURRENT_TIMESTAMP, late_charges = ? WHERE
                        customerid=? AND movieid=?`, [parseFloat(req.body.late_charges), req.body.custid, req.body.movieid],
                (err, row) => {
                    if (err) {
                        console.log("Error in Sql: ", err)
                    }
                    else {
                        res.status(204).send()
                    }

                })
        }
    })
})

module.exports = router
