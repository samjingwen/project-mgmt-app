const SocketIo = require('socket.io');
const {
  getBoardsById,
  updateBoard,
  updateGroup,
  _getBoardById
} = require("./controllers/boardsController");

const sockets = {}

sockets.init = function (server) {
  const io = SocketIo(server);
  io.on("connection", socket => {
    console.log("user connected");

    socket.on("updateBoard", group => {
      // Update to mongodb
      console.log(group);
      updateGroup(group);
      _getBoardById("5deb90dc97265b80c79bbd31").then(result => {
        io.emit("onUpdate", result);
      })

    })




  })
}



module.exports = sockets;

