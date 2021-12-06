const BoardModel = require('../models/board.model');

module.exports.testBoard = async function (req, res, next) {
  let newBoard = new BoardModel({
    _id: req.params.id,
    position: req.body.position,
  });

  const boardUpdated = await BoardModel.updateBoard(
    { _id: req.params.id },
    newBoard,
    (err, board) => {
      if (err) {
        res.json({
          newBoard: newBoard,
          success: false,
          msg: 'Failed to update board',
        });
      } else {
        res.json({ newBoard: newBoard, success: true, msg: 'Board added' });
      }
    }
  );
};
module.exports.addBoard = async (req, res) => {
  const { position } = req.body;
  try {
    const board = await BoardModel.create({ position });
    res.status(201).json({ board: board._id });
  } catch (err) {
    res.status(200).send({ err });
    console.log('ce compte existe déjà : ' + err);
  }
};
