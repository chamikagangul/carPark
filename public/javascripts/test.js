
$(document).ready(function () {
    socket = io();
    $('#btn').click(function(){
        socket.emit('test',$('#data').val());
    });
});





