function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function () {
        this.sound.play();
    }
    this.stop = function () {
        this.sound.pause();
    }
}


$(document).ready(function () {

    mySound = new sound("../sounds/notify.mp3");


    socket = io();
    socket.on('io-update-page', (data) => {
        player = document.getElementById('player');
        player.src = '../sounds/notify.mp3';
        player.play();
        loadSlots();
    });
    
    socket.on('io-redirect', (data) => {
        window.location = "/slot"; 
    });
    socket.on('io-test', (data) => {
        alert(data); 
    });



    loadSlots();
    $(document).on('click', '.cardButton', function () {
        t = (this.id)
        $('#' + t + "card").removeClass("bg-primary");
        $('#' + t + "card").addClass("bg-success");
        socket.emit('io-reserve', {
            msg: "updating all clients",
            data: {
                id: t,
                Name: '',
                status: 'waiting',
                pin:$('#pin'+t).val()
            }
        });
    });
});

function loadSlots() {

    $.ajax({
        type: 'GET',
        url: '/cards/free',
        data: {},
        dataType: 'html',
        success: function (data) {
            $("#freeCards").html(data);
        }
    });
}



