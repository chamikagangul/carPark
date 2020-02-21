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

    socket.on("io-park",(data)=>{
        $( "#cardi" ).removeClass( "bg-warning" );
        $( "#cardi" ).removeClass( "bg-danger" );

        $( "#cardi" ).addClass( "bg-success" );
        mySound.play();
    });

    socket.on("io-remove",(data)=>{
        $( "#cardi" ).removeClass( "bg-success" );
        $( "#cardi" ).removeClass( "bg-warning" );

        $( "#cardi" ).addClass( "bg-danger" );
        mySound.play();
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
        ID = data[0].slotNo ;
    });
    $('.box').hide().fadeIn(1000);
    $('#login').click(function (event) {
        //request card
        socket.emit('io-login', { slotNo: $('#slot').val(), pin: $('#pin').val() });
    });
    $(document).on('click','#remove',function() {
        socket.emit('io-remove', { id : ID });

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

//Stop click event
