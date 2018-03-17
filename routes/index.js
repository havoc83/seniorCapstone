const express = require('express')
const router = express.Router()
const bcrypt = require('bcrypt')

/* GET home page. */

router.get('/', (req, res) => {
    res.render('index', {
        title: 'Brew City Rentals',
        data: `Welcome to the Brew City Rentals management software prototype.
        Please note that payment processing is not currently active so any credit cards enter 
        may say approved but will not actually process.  
        Credit card data will not be saved for security reasons.`
    })
})

router.get('/login', function (req, res) {
    res.render('login', { title: 'Sign in to BCR' })
    req.on('submit', (data) => {
        console.log("Login Submitted: " + data)
    })
})

router.post('/login', (req, res) => {
    req.getConnection((err, connection) => {
        if (err) {
            console.log("Error while selecting from employees table.")
        }
        connection.query('SELECT password FROM employees WHERE email = ?', req.body.email,
            (err, rows) => {
                if (err) {
                    console.log("Error when querying from transaction table")
                }
                else {
                    console.log(rows[0]['password'])
                    if (typeof rows[0]['password'] !== undefined) {
                        if (bcrypt.compareSync(req.body.password, rows[0]['password'])) {
                            res.cookie('user', req.body.email)
                            const token = Math.random().toString();
                            print(token)
                            exports.token = token
                            res.cookie('token', token, { maxAge: 900000, httpOnly: true })
                            res.redirect('/transaction')
                        }
                        else {
                            res.render('login', { title: "Sign in to BCR", data: "Password incorrect" })
                        }
                    }
                    else {
                        res.render('login', { title: "Sign in to BCR", data: "Username incorrect" })
                    }

                }
            })
    })
})

/*
bcrypt.hash(req.body.password, 5, (err, bcryptedPassword) => {
Username admin@bcr.com Password is brewCity
if (err) {
    console.log("Error encrypting password")
}
/*else {
    req.getConnection((err, conn) => {
        if (err) {
            console.log("Error Connecting to the Database")
        }
        else {
            conn.query(`INSERT INTO employees(firstname,lastname,email,password)
            VALUES ('admin','admin','${req.body.email}','${bcryptedPassword}')`, (err, rows) => {
                if (err) {
                    console.log('An Error Occured ', err)
                }
})
}
})
}
})

})
*/

module.exports = router
