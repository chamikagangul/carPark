exports.chat = function (io) {
  io.on('connection', function (socket) {
    console.log('a user connected - io connection');
    socket.on('update',(msg)=>{
      console.log(msg);
    })
  });
}
