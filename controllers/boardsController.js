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
  createBoard,
  updateOwners,
};

const template = '5df34cc45afc0d1ab830081e';

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
  console.log('user:', userId);
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
  console.log(group);
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

function createBoard(req, res, next) {
  const { userId } = req.body;
  const { displayName } = req.body;
  client.connect(error => {
    if (error) {
      res.status(500).json({ message: 'connection failed' });
    }
    client
      .db(process.env.MONGO_DB)
      .collection('boards')
      .findOne({ _id: ObjectId(template) })
      .then(result => {
        console.log(result);
        result._id = new ObjectId();
        result.groups.forEach(group => {
          group._id = new ObjectId();
          group.tasks.forEach(task => {
            task._id = new ObjectId();
          });
        });
        result.owners.push({ user_id: userId, display_name: displayName });
        client
          .db(process.env.MONGO_DB)
          .collection('boards')
          .insertOne(result)
          .then(data => {
            console.log(data);
          });
      });
  });
  console.log(userId);
  res.json({});
}

function updateOwners(req, res, next) {
  const { user } = req.body;
  const { boardId } = req.body;

  client.connect(error => {
    if (error) {
      res.status(500).json({ message: 'connection failed' });
    }
    client
      .db(process.env.MONGO_DB)
      .collection('boards')
      .updateOne({ _id: ObjectId(boardId) }, { $push: { owners: user } })
      .then(result => {
        console.log(result);
      });
  });
  console.log(user);
  console.log(boardId);
  res.json({});
}
