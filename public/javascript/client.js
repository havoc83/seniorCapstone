$(document).ready(function () {
    //Footer with Date
    $("#copywrite").html("<span class='glyphicon glyphicon-copyright-mark'></span>Copywrite " + (new Date).getFullYear() + " Brew City Rentals")
    var renderPage = function (page, loc) {
        $(page).click(function (e) {
            e.preventDefault()
            window.location = loc
        })
    }

    //Login Form Authentication
    renderPage("#login", window.location.origin + "/login")
    //Register Form Authentication
    renderPage("#register", window.location.origin + "/register")
    //Navigation Menu
    renderPage("#menu-home", window.location.origin + "/")
    renderPage("#menu-movies", window.location.origin + "/movies")
    renderPage("#menu-customers", window.location.origin + "/customers")
    renderPage("#menu-employees", window.location.origin + "/employees")
    renderPage("#menu-transaction", window.location.origin + "/transaction")
    renderPage("#menu-reports", window.location.origin + "/reports")



})
