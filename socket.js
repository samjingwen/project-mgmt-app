require('dotenv').config();
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
    // client.connect().then(client => {
    //   const collection = client.db(process.env.MONGO_DB).collection('boards');
    //   const changeStream = collection.watch();

    //   let newChangeStream;

    //   changeStream.on('change', data => {
    //     console.log('from change stream');
    //     console.log(data);
    //   })

    // })
    socket.on("updateBoard", group => {
      // Update to mongodb

      _getBoardById("5deb90dc97265b80c79bbd31").then(result => {
        io.emit("onUpdate", result);
      })

    })




  })
}



module.exports = sockets;

