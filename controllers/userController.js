require('dotenv').config();
const jwt = require('jsonwebtoken');
const { check, validationResult, query } = require('express-validator');
const uuid = require('uuid');

const dbUtils = require('../utils/database.utils');
const pool = require('../config/mysql.config');

// TODO: HASH BEFORE QUERY FROM SERVER
// SQl statements
const SELECT_USER_BY_EMAIL_PASSWORD =
  'select user_id, email, display_name from users where email = ? and password = sha2(?, 256)';
const selectUserByEmailPassword = dbUtils.mkQueryFromPool(
  dbUtils.mkQuery(SELECT_USER_BY_EMAIL_PASSWORD),
  pool
);

const SELECT_USER_BY_USER_ID =
  'select user_id, email, display_name from users where user_id = ?';
const selectUserById = dbUtils.mkQueryFromPool(
  dbUtils.mkQuery(SELECT_USER_BY_USER_ID, pool),
  pool
);

const SELECT_ALL_USER = 'select user_id, email, display_name from users';
const selectAllUser = dbUtils.mkQueryFromPool(
  dbUtils.mkQuery(SELECT_ALL_USER, pool),
  pool
);

const INSERT_USER =
  'insert into users (user_id, email, display_name, password) values(?, ?, ?, sha2(?, 256))';
const insertUser = dbUtils.mkQueryFromPool(
  dbUtils.mkQuery(INSERT_USER, pool),
  pool
);

module.exports = { signInUser, getUserById, getAllUsers, createUser };

function signInUser(req, res, next) {
  const user = {
    email: req.query.email,
    password: req.query.password,
  };
  console.log(user);
  _authenticateUser(user)
    .then(result => {
      res.status(200).json({
        token_type: 'Bearer',
        access_token: result.token,
        expires_at: result.expires_at,
        user_id: result.user_id,
        display_name: result.display_name,
      });
    })
    .catch(error => {
      res.status(401).json({ message: 'Something went wrong' });
    });
}

function getAllUsers(req, res, next) {
  selectAllUser()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(error => {
      res.status(401).json({ message: 'Internal server error' });
    });
}

function _authenticateUser(user) {
  const { email, password } = user;
  return new Promise((resolve, reject) => {
    selectUserByEmailPassword([email, password]).then(result => {
      console.log(result);
      if (result.length > 0) {
        const now = new Date().getTime();
        const currentUser = result[0];
        const token = jwt.sign(
          {
            sub: currentUser.user_id,
            iss: 'productivv',
            iat: Math.floor(now / 1000),

            // exp: Math.floor(now / 1000) + (60 * 15),
            exp: Math.floor(now / 1000) + 60 * 30,
            data: { ...currentUser },
          },
          process.env.JWT_SECRET
        );
        resolve({
          token,
          expires_at: Math.floor(now / 1000) + 60 * 30,
          user_id: currentUser.user_id,
          display_name: currentUser.display_name,
        });
      }
      reject();
    });
  });
}

function getUserById(userId) {
  return new Promise((resolve, reject) => {
    selectUserById([userId]).then(result => {
      if (result.length > 0) {
        resolve(result[0]);
      }
      reject();
    });
  });
}

function createUser(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  console.log('params:', req.query);
  const params = [uuid(), req.query.email, 'User123', req.query.password];
  insertUser(params)
    .then(result => {
      res.status(201).json({ message: 'success' });
    })
    .catch(error => {
      console.log(error);
      res.status(401).json({ message: 'Something went wrong' });
    });
}
