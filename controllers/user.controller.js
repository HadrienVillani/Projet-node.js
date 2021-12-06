const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.getAllUsers = async (req, res) => {
  const users = await UserModel.find().select('-password');
  res.status(200).json(users);
};
module.exports.userInfo = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send('ID inconnu : ' + req.params.id);
  }
  UserModel.findById(req.params.id, (err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log('id inconnu' + err);
    }
  }).select('-password');
};
module.exports.updateUser = async (req, res, next) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send('ID inconnu : ' + req.params.id);
  }
  try {
    const { bio } = req.body;
    const { id } = req.params;

    const user = await UserModel.findOne({ _id: id });
    user.bio = bio;
    await user.save();
    console.log(user);
    res.json({ msg: 'Modification enregistré !', user });
  } catch (e) {
    res.status(500).json({ msg: "Un erreur s'est produite !" });
  }
};

module.exports.deleteUser = async (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send('ID inconnu : ' + req.params.id);
  }

  try {
    await UserModel.remove({ _id: req.params.id }).exec();
    return res.status(400).json({ message: 'ça a bien été supprimé' });
  } catch (e) {
    res.status(500).json({
      message: "Un erreur s'est produite lors de la suppression!" + e,
    });
  }
};
