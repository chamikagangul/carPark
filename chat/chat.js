exports.chat = function (io) {
  var S = {};
  io.on('connection', function(socket){
    socket.on('io-update', function(msg){
      console.log(msg);
      io.emit('io-update-page', "update the page");
    });
  });
}
