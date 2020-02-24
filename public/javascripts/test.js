
$(document).ready(function () {
    socket = io();
    $('#btn1').click(function () {


        var OneSignal = window.OneSignal || [];
        OneSignal.push(function () {
            OneSignal.init({
                appId: "ad2a0b49-4db7-425d-b5c2-d1d34330248e",
            });
        });

        $.ajax({
            url: "/sampath",
            data: { "slotNo": $("#data1").val(), "status": $("#data2").val() },
            method: "POST",
            success: (data) => {
                console.log(data);
            }
        });
    });
    socket.on("test", (data) => {
        alert(data);
    });
});
