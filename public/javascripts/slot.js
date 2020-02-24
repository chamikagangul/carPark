function field_focus(field, email) {
    if (field.value == email) {
        field.value = '';
    }
}

function field_blur(field, email) {
    if (field.value == '') {
        field.value = email;
    }
}

//Fade in dashboard box
$(document).ready(function () {
    mySound = new sound("../sounds/notify.mp3");
    var ID;
    socket = io();

    socket.on("io-park", (data) => {
        $("#cardi").removeClass("bg-warning");
        $("#cardi").removeClass("bg-danger");

        $("#cardi").addClass("bg-success");
        mySound.play();
    });

    socket.on("io-remove", (data) => {
        $("#cardi").removeClass("bg-success");
        $("#cardi").removeClass("bg-warning");

        $("#cardi").addClass("bg-danger");
        mySound.play();
        $.confirm({
            title: 'Confirm!',
            content: 'Did You removed your vehicle?',
            buttons: {
                Yes: function () {
                    $.alert('Ok :)');
                },
                No: function () {
                    httpGet("http://10.10.19.40:1880/node2?alarm=1");
                    $.alert('Alrm sent');
                },
            }
        });
    });

    socket.on("io-card", (data) => {
        if (1) {
            $('#card').html(`<div class="card text-white bg-warning mt-2" id='cardi' style="max-width: 18rem; margin: auto;" >
        <div class="card-header">
            <h3>Slot `+ data[0].slotNo + `</h3>
        </div>
        <div class="card-body">
            <p class="card-text">`+ data[0].Name + ` Parked here</p>
            <button type="button" class="btn btn-dark cardButton" id='remove'>Remove</button>
        </div>
        </div>`);
        }
        ID = data[0].slotNo;
    });
    $('.box').hide().fadeIn(1000);
    $('#login').click(function (event) {
        //request card
        socket.emit('io-login', { slotNo: $('#slot').val(), pin: $('#pin').val() });
    });
    $(document).on('click', '#remove', function () {
        socket.emit('io-remove', { id: ID });
    });
});


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

function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    return xmlHttp.responseText;
}

//Stop click event
