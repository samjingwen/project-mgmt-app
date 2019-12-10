const express = require('express');
const router = express.Router();

const { getBoardsById, updateBoard } = require("../controllers/boardsController");

router.get('/:board_id', getBoardsById);

router.post('/update', updateBoard);



module.exports = router;