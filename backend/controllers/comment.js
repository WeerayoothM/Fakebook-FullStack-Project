const db = require("../models");

const createComment = async (req, res) => {
  const { comment, postId } = req.body;
  const newComment = await db.Comment.create({ comment, post_id: postId, user_id: req.user.id });
  res.status(201).send(newComment);
};

const deleteComment = async (req, res) => {
  const commentId = req.params.id;
  await db.Comment.destroy({ where: { id: commentId, user_id: req.user.id } });
  res.status(204).send();
};

const updateComment = async (req, res) => {
  const commentId = req.params.id;
  const { comment } = req.body;
  await db.Comment.update({ comment }, { where: { id: commentId, user_id: req.user.id } });
  res.status(200).send({ message: "updated" });
};

module.exports = {
  createComment,
  deleteComment,
  updateComment
};