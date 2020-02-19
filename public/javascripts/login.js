$(document).ready(function () {
    $('.message a').click(function () {
        $('form').animate({ height: "toggle", opacity: "toggle" }, "slow");
    });

    $("#login").click(function () {
        $.ajax({
            type: 'POST',
            url: '/login',
            timeout: 5000,
            data: {
                name: $('#name').val(),
                pin: $('#pin').val()
            },
            dataType: 'html',
            success: function (data) {
                alert(data);
                window.location.href = "/home";
            },
            error: function(jqXHR, textStatus, errorThrown) {
                alert(textStatus); // this will be "timeout"
            }
        });
    });

    $("#signIn").click(function () {
        $.ajax({
            type: 'POST',
            url: '/signIn',
            timeout: 5000,
            data: {
                name: $('#nameSI').val(),
                pin: $('#pinSI').val()

            },
            dataType: 'html',
            success: function (data) {
                alert(data);
                window.location.href = "/";
            }
        });
    });

});