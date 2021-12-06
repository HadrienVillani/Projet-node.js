const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;

module.exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log('error to get data : ' + err);
    }
  });
};
module.exports.createPost = async (req, res) => {
  const newPost = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    video: req.body.video,
    likers: [],
    comments: [],
  });
  try {
    const post = await newPost.save();
    return res.status(201).json(post);
  } catch (err) {
    return res.status(400).send(err);
  }
};
module.exports.updatePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send('ID inconnu : ' + req.params.id);
  }
  const updatedRecord = {
    message: req.body.message,
  };
  PostModel.findByIdAndUpdate(
    req.params.id,
    { $set: updatedRecord },
    { new: true },
    (err, docs) => {
      if (!err) {
        res.send(docs);
      } else {
        console.log('update error : ' + err);
      }
    }
  );
};
module.exports.deletePost = (req, res) => {
  if (!ObjectID.isValid(req.params.id)) {
    return res.status(400).send('ID inconnu : ' + req.params.id);
  }
  PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) {
      res.send('Cette élément a bien été supprimé : ' + docs.id);
    } else {
      console.log('delete error : ' + err);
    }
  });
};
module.exports.commentPost = (req, res) => {};
module.exports.editCommentPost = (req, res) => {};
module.exports.deleteCommentPost = (req, res) => {};
