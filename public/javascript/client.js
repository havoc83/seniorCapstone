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
    //renderPage("#register", window.location.origin + "/register")
    //Navigation Menu
    renderPage("#menu-home", window.location.origin + "/")
    renderPage("#menu-movies", window.location.origin + "/movies")
    renderPage("#menu-customers", window.location.origin + "/customers")
    renderPage("#menu-employees", window.location.origin + "/employees")
    renderPage("#menu-transaction", window.location.origin + "/transaction")
    renderPage("#menu-reports", window.location.origin + "/reports")

    $("#customerid").change(() => {
        $.get('transaction/' + $("#custid").val(),
            (fee) => {
                let feeAmount = JSON.parse(fee)[0].fee
                $('#fee-amount').val(feeAmount)
                if (feeAmount > 0) {
                    $('#fee-amount').addClass('has-error')
                }
            })
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
        let transType = $('input[name=trans_type]:checked').val()
        console.log(transType)
        if (transType === '1') {
            $.ajax({
                url: $('#transaction-form').attr('action') + "checkout",
                type: 'POST',
                data: $('#transaction-form').serialize(),
                success: function (res) {
                    $('#transaction-form')[0].reset()
                    alert("Checkout Completed")

                }
            })
        }
        else {
            $.ajax({
                url: $('#transaction-form').attr('action') + "checkin",
                type: 'PUT',
                data: $('#transaction-form').serialize(),
                success: (res) => {
                    $('#transaction-form')[0].reset()
                    alert("Checkin Completed")
                }
            })
        }

    })



})
