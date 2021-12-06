const mongoose = require('mongoose');

const BoardSchema = mongoose.Schema({
  position: {
    type: String,
  },
});

const Board = (module.exports = mongoose.model('boards', BoardSchema));

module.exports.getBoardById = function (id, callback) {
  Board.findById(id, callback);
};

module.exports.addBoard = function (newBoard, callback) {
  newBoard.save(callback);
};

module.exports.updateBoard = function (condition, update, callback) {
  Board.updateOne(condition, update, callback);
};
