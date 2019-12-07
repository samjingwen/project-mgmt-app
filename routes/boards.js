const express = require('express');
const router = express.Router();

const { getBoardsById } = require("../controllers/boardsController");

router.get('/:board_id', getBoardsById);

module.exports = router;