require('dotenv').config();
const MongoClient = require('mongodb').MongoClient;

const url = process.env.MONGO_URI;

const client = new MongoClient(url, { useUnifiedTopology: true })


const connect = (client) => {
  return new Promise(
    (resolve, reject) => {
      client.connect(
        (err) => {
          if (err)
            return reject(err);
          resolve();
        }
      )
    }
  );
}

module.exports = client;