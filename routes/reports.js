const express = require('express')
const router = express.Router()

router.get('/reports', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) {
            console.log("Error while selecting from customers table.")
        }
        connection.query(`SELECT mv.dvd_id, mv.title, tr.due_date, tr.customerid FROM movies AS mv
        JOIN transaction AS tr on mv.dvd_id = tr.dvdid WHERE tr.returned_date IS NULL;`,
            (err, rows) => {
                if (err) {
                    console.log("Error Selecting : %s ", err)
                }
                else {
                    res.render('reports', { title: "BCR Checked Out Movies", data: rows })
                }
            })
    })
})

module.exports = router
