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
    var ID;
    socket = io();

    socket.on("io-test",(data)=>{
        alert(data);
    })

    socket.on("io-card", (data) => {
        if (1) {
            $('#card').html(`<div class="card text-white bg-success mt-2" style="max-width: 18rem; margin: auto;" >
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

//Stop click event
