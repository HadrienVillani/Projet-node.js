const PostModel = require('../models/post.model');
const UserModel = require('../models/user.model');
const ObjectID = require('mongoose').Types.ObjectId;
const { uploadErrors } = require('../utils/errors.utils');
const fs = require('fs');
const { promisify } = require('util');
const pipeline = promisify(require('stream').pipeline);
const existId = (request, response) => {
  if (!ObjectID.isValid(request.params.id)) {
    return response.status(400).send('ID inconnu : ' + request.params.id);
  }
};

module.exports.readPost = (req, res) => {
  PostModel.find((err, docs) => {
    if (!err) {
      res.send(docs);
    } else {
      console.log('error to get data : ' + err);
    }
  }).sort({ createdAt: -1 });
};
module.exports.createPost = async (req, res) => {
  let fileName;

  if (req.file !== null) {
    try {
      if (
        req.file.detectedMimeType != 'image/jpg' &&
        req.file.detectedMimeType != 'image/png' &&
        req.file.detectedMimeType != 'image/jpeg'
      ) {
        throw Error('invalid file');
      }

      if (req.file.size > 500000) {
        throw Error('invalid size');
      }
    } catch (err) {
      const errors = uploadErrors(err);
      return res.status(201).json({ errors });
    }
    fileName = req.body.posterId + Date.now() + '.jpg';
    await pipeline(
      req.file.stream,
      fs.createWriteStream(
        `${__dirname}/../client/public/uploads/posts/${fileName}`
      )
    );
  }

  const newPost = new PostModel({
    posterId: req.body.posterId,
    message: req.body.message,
    picture: req.file !== null ? './uploads/posts/' + fileName : '',
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
  existId(req, res);
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
  existId(req, res);
  PostModel.findByIdAndRemove(req.params.id, (err, docs) => {
    if (!err) {
      res.send('Cette élément a bien été supprimé : ' + docs.id);
    } else {
      console.log('delete error : ' + err);
    }
  });
};
module.exports.commentPost = (req, res) => {
  existId(req, res);
  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: {
          comments: {
            commenterId: req.body.commenterId,
            commenterPseudo: req.body.commenterPseudo,
            text: req.body.text,
            timestamps: new Date().getTime(),
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) {
          return res.send(docs);
        } else {
          return res.status(400).send(err);
        }
      }
    );
  } catch (err) {
    res.status(400).send(err);
  }
};
module.exports.editCommentPost = (req, res) => {
  existId(req, res);
  try {
    return PostModel.findById(req.params.id, (err, docs) => {
      const theComment = docs.comments.find((comment) =>
        comment._id.equals(req.body.commentId)
      );
      if (!theComment) {
        return res.status(404).send('comment not found');
      } else {
        theComment.text = req.body.text;
        return docs.save((err) => {
          if (!err) {
            console.log(docs);
            return res.status(200).send(docs);
          } else {
            return res.satus(500).send(err);
          }
        });
      }
    });
  } catch (err) {
    return res.status(404).send('comment not found');
  }
};
module.exports.deleteCommentPost = (req, res) => {
  existId(req, res);
  try {
    return PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $pull: {
          comments: {
            _id: req.body.commentId,
          },
        },
      },
      { new: true },
      (err, docs) => {
        if (!err) {
          return res.send(docs);
        } else {
          return res.status(400).send(err);
        }
      }
    );
  } catch (err) {
    return res.status(404).send('comment not found' + err);
  }
};
