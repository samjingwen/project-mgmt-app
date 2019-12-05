require('dotenv').config();
const aws = require('aws-sdk');


const s3 = new aws.S3({
  endpoint: new aws.Endpoint('sgp1.digitaloceanspaces.com'),
  accessKeyId: process.env.S3_ACCESS_KEY,
  secretAccessKey: process.env.S3_SECRET_KEY
});

module.exports = s3;