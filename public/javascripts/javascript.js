$(document).ready(function () {

    socket = io();
    socket.on('io-update-page',(data)=>{
        loadSlots();
    });

    loadSlots();
    $(document).on('click', '.cardButton', function () {
        t = (this.id)
        $('#' + t + "card").removeClass("bg-primary");
        $('#' + t + "card").addClass("bg-success");
        $.ajax({
            type: 'POST',
            url: '/cards/update',
            data: {
                id: t,
                Name: 'chamika',
                status: 'reserved'

            },
            dataType: 'html',
            success: function (data) {
                socket.emit('io-update',"updating all clients");

            }
        });


    });

});

function loadSlots() {

    $.ajax({
        type: 'GET',
        url: '/cards',
        data: {},
        dataType: 'html',
        success: function (data) {
            $("#slotContainer").html(data);
        }
    });
}

