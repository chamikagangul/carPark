function sound(src) {
    this.sound = document.createElement("audio");
    this.sound.src = src;
    this.sound.setAttribute("preload", "auto");
    this.sound.setAttribute("controls", "none");
    this.sound.style.display = "none";
    document.body.appendChild(this.sound);
    this.play = function(){
      this.sound.play();
    }
    this.stop = function(){
      this.sound.pause();
    }
  }


$(document).ready(function () {

    mySound = new sound("../sounds/notify.mp3");
    

    socket = io();
    socket.on('io-update-page', (data) => {
        loadSlots();
        mySound.play();
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
                socket.emit('io-update', "updating all clients");

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



