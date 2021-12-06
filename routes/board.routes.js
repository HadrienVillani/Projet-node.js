const router = require('express').Router();
const boardController = require('../controllers/board.controller');

router.post('/board', boardController.addBoard);

router.put('/:id', boardController.testBoard);

module.exports = router;
