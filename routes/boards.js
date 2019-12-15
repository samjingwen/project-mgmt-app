const express = require('express');

const router = express.Router();

const {
  getBoardsById,
  updateBoard,
  getBoardsByUserId,
  createBoard,
  updateOwners,
} = require('../controllers/boardsController');

const { validateToken } = require('../utils/passport.utils');

router.get('/:board_id', getBoardsById);

router.get('/user/:userId', validateToken, getBoardsByUserId);

router.post('/update', updateBoard);

router.post('/create', createBoard);

router.post('/owner', updateOwners);

module.exports = router;
