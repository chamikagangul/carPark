exports.chat = function (io) {
  io.on('connection', function (socket) {
    console.log('a user connected');
    socket.on('update',(msg)=>{
      console.log(msg);
    })
  });
}
