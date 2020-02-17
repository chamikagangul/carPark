$(document).ready(function () {

     loadSlots();
    $(".cardButton").on('click', function () {
        var t = (this.id);
        console.log(t)
    });
});

function loadSlots() {
    
    $.ajax({
        type: 'GET',
        url: '/cards',
        data: {},
        dataType: 'html',
        success: function(data){
            $("#slotContainer").html(data);
        }
      });
}