/*
exports.Show = function (req, res, page, showQuery) {
    req.getConnection(function (err, connection) {

        connection.query(showQuery, function (err, rows) {

            if (err) {
                console.log("Error Selecting : %s ", err)
            }
            else {
                res.render(page, { title: "BCR " + page, data: rows })
            }
        })
    })
}

exports.Add = function (req, res, page) {
    res.render('add' + page.charAt(0).toUpperCase() + page.slice(1), { title: "Add " + page })
}

exports.Edit = function (req, res, page, editQuery) {
    var id = req.params.id
    req.getConnection(function (err, connection) {
        connection.query(editQuery, [id], function (err, rows) {
            if (err) {
                console.log("Error Selecting: %s", err)
            }
            else {
                res.render('edit' + page.charAt(0).toUpperCase() + page.slice(1), { title: 'Edit ' + page })
            }
        })
    })
}

exports.Save = function (req, res, page, saveQuery, update = false) {
    var input = JSON.parse(JSON.stringify(req.body))
    if (page === 'employees') {
        var data = {
            fname: input.firstname,
            lname: input.lastname,
            email: input.email,
            phone: input.phone
        }
    }
    if (update) {
        var id = req.params.id
        var params = [data, id]
    }
    else {
        var params = data
    }
    req.getConnection(function (err, connection) {
        connection.query(saveQuery, params, function (err, rows) {
            if (err) {
                console.log("Error Inserting: %s", err)
            }
            else {
                res.redirect("/" + page)
            }
        })
    })

}

exports.Delete = function (req, res, page, deleteQuery) {
    var id = req.params.id
    req.getConnection(function (err, connection) {
        connection.query(deleteQuery, [id], function (err, rows) {
            if (err) {
                console.log("Error Deleting Row: %s", err)
            }
            else {
                res.redirect("/" + page)
            }
        })
    })

}

*/
exports.empShow = function (req, res) {
    req.getConnection(function (err, connection) {

        connection.query('SELECT empid,firstname,lastname,email,phone FROM employees', function (err, rows) {

            if (err) {
                console.log("Error Selecting : %s ", err)
            }
            else {
                console.log(rows)
                res.render('employees', { title: "BCR Employees", data: rows })
            }
        })
    })
}

exports.empAdd = function (req, res) {
    res.render('addemployee', { title: "Add Employees" })
}

exports.empEdit = function (req, res) {
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
}

exports.empSave = function (req, res) {
    var input = JSON.parse(JSON.stringify(req.body))
    var data = {
        firstname: input.firstname,
        lastname: input.lastname,
        email: input.email,
        phone: input.phone
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
}

exports.empEditSave = function (req, res) {
    var input = JSON.parse(JSON.stringify(req.body))
    var id = req.params.id
    var data = {
        fname: input.firstname,
        lname: input.lastname,
        email: input.email,
        phone: input.phone,

    }
    req.getConnection(function (err, connection) {
        connection.query("UPDATE Employees SET ? WHERE ?", [data, id], function (err, rows) {
            if (err) {
                console.log("Error Updating: %s", err)
            }
            else {
                res.redirect("/employees")
            }
        })
    })
}
exports.empDelete = function (req, res) {
    var id = req.params.id
    req.getConnection(function (err, connection) {
        connection.query("DELETE FROM Employees WHERE empid = ?", [id], function (err, rows) {
            if (err) {
                console.log("Error Deleting Row: %s", err)
            }
            else {
                res.redirect("/employees")
            }
        })
    })

}

exports.moviesShow = function (req, res) {
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
}

exports.moviesAdd = function (req, res) {
    res.render('addMovie', { title: "Add Movies" })
}

exports.moviesEdit = function (req, res) {
    var id = req.params.id
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
}

exports.moviesSave = function (req, res) {
    var input = JSON.parse(JSON.stringify(req.body))
    var data = {
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
}

exports.moviesEditSave = function (req, res) {
    var input = JSON.parse(JSON.stringify(req.body))
    var id = req.params.id
    var data = {
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
}
exports.moviesDelete = function (req, res) {
    var id = req.params.id
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

}
