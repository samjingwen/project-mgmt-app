const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');
const passport = require('passport');

const usersRouter = require('./routes/users');
const boardsRouter = require('./routes/boards');
const authRouter = require('./routes/auth-google');

const app = express();

app.use(passport.initialize());
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/user', usersRouter);
app.use('/api/boards', boardsRouter);
app.use('/auth', authRouter);

module.exports = app;
