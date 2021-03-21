exports = module.exports = (io) => {
  function getChannelName(socketReferer) {
    return socketReferer.split('/').slice(-1)[0];
  }
  let socketUsers = {};

  io.on('connection', (socket) => {
    socket.on('userIdFromClient', (userId) => {
      const channelName = getChannelName(socket.handshake.headers.referer);
      socketUsers[socket.id] = { userId, channelName };
      console.log(socketUsers);
    });

    socket.on('disconnect', () => {
      if (socketUsers && socketUsers[socket.id]) {
        delete socketUsers[socket.id]
      }
    })
  });
};
