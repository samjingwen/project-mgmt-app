const express = require('express');

const router = express.Router();

const {
  getBoardsById,
  updateBoard,
  getBoardsByUserId,
} = require('../controllers/boardsController');

router.get('/:board_id', getBoardsById);

router.get('/user/:userId', getBoardsByUserId);

router.post('/update', updateBoard);

module.exports = router;
