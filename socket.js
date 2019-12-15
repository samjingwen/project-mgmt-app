require('dotenv').config();
const SocketIo = require('socket.io');
const { ObjectId } = require('mongodb');
const {
  getBoardsById,
  updateBoard,
  updateGroup,
  _getBoardById,
} = require('./controllers/boardsController');
const client = require('./config/atlas.config');

const sockets = {};

sockets.init = function(server) {
  const io = SocketIo(server);
  io.on('connection', socket => {
    console.log('user connected');
    // client.connect().then(client => {
    //   const collection = client.db(process.env.MONGO_DB).collection('boards');
    //   const changeStream = collection.watch();

    //   let newChangeStream;

    //   changeStream.on('change', data => {
    //     console.log('from change stream');
    //     // console.log(data);
    //     io.emit('onUpdate');
    //   });
    // });

    socket.on('updateBoard', data => {
      // Update to mongodb
      const { group } = data;
      const { userId } = data;
      console.log(group);
      group._id = ObjectId(group._id);
      group.tasks.forEach(task => {
        task._id = ObjectId(task._id);
      });
      console.log(group);
      client.connect(error => {
        client
          .db(process.env.MONGO_DB)
          .collection('boards')
          .updateOne(
            { groups: { $elemMatch: { _id: group._id } } },
            { $set: { 'groups.$': group } },
            { upsert: false }
          )
          .then(result => {
            client.connect(error => {
              client
                .db(process.env.MONGO_DB)
                .collection('boards')
                .find({
                  'owners.user_id': userId,
                })
                .toArray((error, payload) => {
                  io.emit('onUpdate', payload);
                });
            });
          });
      });
    });
  });
};

module.exports = sockets;
