
$(document).ready(function () {
    socket = io();
    $('#btn1').click(function(){
        socket.emit('io-carPark-park',$('#data1').val());
    });

    $('#btn2').click(function(){
        socket.emit('io-carPark-remove',$('#data2').val());
    });
});





