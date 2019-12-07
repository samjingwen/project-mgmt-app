require('dotenv').config();
const jwt = require('jsonwebtoken');
const ObjectId = require('mongodb').ObjectID;

const client = require('../config/atlas.config');

module.exports = { getBoardsById };

function getBoardsById(req, res, next) {
  const board_id = req.params.board_id;
  if (board_id.match(/^[0-9a-fA-F]{24}$/)) {
    client.connect(error => {
      if (error) {
        return res.status(500).json({ message: "connection failed" });
      }
      client.db(process.env.MONGO_DB).collection('boards')
        .findOne({ "_id": ObjectId(board_id) }, (error, result) => {
          if (error) {
            return res.json({ message: "Something went wrong" });
          }
          if (result) {
            return res.json({ payload: result });
          }
          return res.json({ message: "No record found" });
        });
    })
  } else {
    return res.status(404).json({ message: "Board not found" });
  }
}

