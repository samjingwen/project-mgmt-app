require('dotenv').config();
const { MongoClient } = require('mongodb');

const url = process.env.MONGO_URI;

const client = new MongoClient(url, { useUnifiedTopology: true });

module.exports = client;
