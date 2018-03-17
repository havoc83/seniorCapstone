$(document).ready(function () {
    //Footer with Date
    $("#copywrite").html("<span class='glyphicon glyphicon-copyright-mark'></span>Copywrite " + (new Date).getFullYear() + " Brew City Rentals")
    const renderPage = function (page, loc) {
        $(page).click(function (e) {
            e.preventDefault()
            window.location = loc
        })
    }
    $(function () {
        $('#due-date').datetimepicker()
    })

    $("#loginSubmit").click((e) => {
        if (!$("#email").val() || !$("#pw").val()) {
            e.preventDefault()
            $("#login-error").removeClass("hidden")
            $("#login-error").text("Email or Password are missing")
            $("#email").addClass("has-error")
            $("#pw").addClass("has-error")
        }
        else {
            renderPage("#loginSubmit", window.location.origin + "/")
        }

    })
    /*
    $("#loginSubmit").on("login success", (res) => {
        localStorage.setItem("uid", res.uid)
        localStorage.setItem("token", res.token)
    })*/
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

    $("#phone").change(() => {
        $.get('transaction/' + $("#phone").val(),
            function (data) {
                $('#late-fees').removeClass('hidden')
                let feeAmount = JSON.parse(data)[0].fee
                feeAmount = 1
                $('#fee-amount').val(feeAmount)
                if (feeAmount > 0) {
                    $('#fee-amount').addClass('has-error')
                }
            })
    })
    var transType = ""

    $("#checkin").click((e) => {
        e.preventDefault()
        $("#late-fees").removeClass("hidden")
        if (!$("#due-date").hasClass("hidden")) {
            $("#due-date").addClass("hidden")
        }
        if (!$("#payment").hasClass("hidden")) {
            $("#payment").addClass("hidden")
        }
        $('#transaction-form')[0].reset()
        transType = 'checkin'
    })

    $("#checkout").click((e) => {
        e.preventDefault()
        if ($("#due-date").hasClass("hidden")) {
            $("#due-date").removeClass("hidden")
        }
        if ($("#payment").hasClass("hidden")) {
            $("#payment").removeClass("hidden")
        }
        $('#transaction-form')[0].reset()
        transType = 'checkout'
    })


    $("#cash").click((e) => {
        e.preventDefault()
        if ($("#input-amount").hasClass("hidden")) {
            $("#input-amount").removeClass("hidden")
        }
        if (!$("#input-credit").hasClass("hidden")) {
            $("#input-credit").addClass("hidden")
        }
    })

    $("#check").click((e) => {
        e.preventDefault()
        if ($("#input-amount").hasClass("hidden")) {
            $("#input-amount").removeClass("hidden")
        }
        if (!$("#input-credit").hasClass("hidden")) {
            $("#input-credit").addClass("hidden")
        }
        $("#input-check").removeClass("hidden")
    })
    $("#credit").click((e) => {
        e.preventDefault()
        if ($("#input-amount").hasClass("hidden")) {
            $("#input-amount").removeClass("hidden")
        }
        if (!$("#input-check").hasClass("hidden")) {
            $("#input-check").addClass("hidden")
        }
        $("#input-credit").removeClass("hidden")
    })

    $("#transaction-form").submit((e) => {
        e.preventDefault()
        if ($("#phone").val() === '') {
            $("#customer-phone").addClass("has-error")
        }
        else if ($("#dvd").val() === '') {
            $("#dvd-id").addClass("has-error")
        }
        else {
            if (transType === 'checkout') {
                $.ajax({
                    url: $('#transaction-form').attr('action'),
                    type: 'POST',
                    data: $('#transaction-form').serialize(),
                    success: function (res) {
                        console.log(JSON.parse(res).body)
                        $('#transaction-form').each(() => { this.reset() })
                    }
                })
            }
            else {
                $.ajax({
                    url: $('#transaction-form').attr('action'),
                    type: 'PUT',
                    data: $('#transaction-form').serialize(),
                    success: (res) => {
                        console.log(JSON.parse(res).body)
                        $('#transaction-form').each(() => { this.reset() })
                    }
                })
            }
        }

    })



})
