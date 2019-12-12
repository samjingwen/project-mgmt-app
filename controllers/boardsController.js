require('dotenv').config();
const jwt = require('jsonwebtoken');
const { ObjectId } = require('mongodb');

const client = require('../config/atlas.config');

module.exports = {
  getBoardsById,
  updateBoard,
  updateGroup,
  _getBoardById,
  getBoardsByUserId,
};

function getBoardsById(req, res, next) {
  const { boardId } = req.params;
  console.log(boardId);
  if (boardId.match(/^[0-9a-fA-F]{24}$/)) {
    client.connect(error => {
      if (error) {
        return res.status(500).json({ message: 'connection failed' });
      }
      client
        .db(process.env.MONGO_DB)
        .collection('boards')
        .findOne({ _id: ObjectId(boardId) }, (error, result) => {
          if (error) {
            return res.json({ message: 'Something went wrong' });
          }
          if (result) {
            return res.json(result);
          }
          return res.json({ message: 'No record found' });
        });
    });
  } else {
    return res.status(404).json({ message: 'Board not found' });
  }
}

function getBoardsByUserId(req, res, next) {
  const { userId } = req.params;
  console.log(userId);
  if (
    userId.match(
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i
    )
  ) {
    client.connect(error => {
      if (error) {
        return res.status(500).json({ message: 'Connection failed' });
      }
      client
        .db(process.env.MONGO_DB)
        .collection('boards')
        .find({
          'owners.user_id': userId,
        })
        .toArray((error, result) => {
          if (error) {
            return res.json({ message: 'Something went wrong' });
          }
          if (result) {
            console.log(result);
            return res.json(result);
          }
          return res.json({ message: 'No record found' });
        });
    });
  } else {
    return res.status(404).json({ message: 'User not found' });
  }
}

function updateBoard(req, res, next) {
  const group = req.body;
  group._id = ObjectId(group._id);
  group.tasks.forEach(task => {
    task._id = ObjectId(task._id);
  });
  console.log(group);
  client.connect(error => {
    if (error) {
      return res.status(500).json({ message: 'connection failed' });
    }
    client
      .db(process.env.MONGO_DB)
      .collection('boards')
      .updateOne(
        { groups: { $elemMatch: { _id: group._id } } },
        { $set: { 'groups.$': group } },
        { upsert: false }
      );
  });

  res.json({});
}

function _getBoardById(boardId) {
  if (boardId.match(/^[0-9a-fA-F]{24}$/)) {
    return new Promise((resolve, reject) => {
      client.connect(error => {
        if (error) {
          console.log(error);
          reject();
        }
        client
          .db(process.env.MONGO_DB)
          .collection('boards')
          .findOne({ _id: ObjectId(boardId) }, (error, result) => {
            if (error) {
              console.log(error);
              reject();
            }
            console.log(result);

            return resolve(result);
          });
      });
    });
  }
}

function updateGroup(group) {
  group._id = ObjectId(group._id);
  group.tasks.forEach(task => {
    task._id = ObjectId(task._id);
  });
  console.log(group);
  client.connect(error => {
    if (error) {
      return res.status(500).json({ message: 'connection failed' });
    }
    client
      .db(process.env.MONGO_DB)
      .collection('boards')
      .updateOne(
        { groups: { $elemMatch: { _id: group._id } } },
        { $set: { 'groups.$': group } },
        { upsert: false }
      );
  });
}
