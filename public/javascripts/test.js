
$(document).ready(function () {
    socket = io();
    $('#btn1').click(function(){
        $.ajax({
            url : "/sampath",
            data : {"slotNo":$("#data1").val(),"status":$("#data2").val()},
            method : "POST",
            success : (data)=>{
               console.log(data);
            }
        });
    });
    socket.on("test",(data)=>{
        alert(data);
    });
});





