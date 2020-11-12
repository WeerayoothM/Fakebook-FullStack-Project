const db = require("../models");

// DEV ONLY
const getAllPostWithoutAuth = async (req, res) => {
  const allPostInDb = await db.Post.findAll({
    include: [
      {
        model: db.Comment,
        attributes: ["id", "comment"],
        include: [{ model: db.User, attributes: ["id", "name", "profile_url"] }]
      },
      { model: db.User, attributes: ["id", "name", "profile_url"] }
    ],
    attributes: ["id", "caption", "picture_url", "createdAt", "updatedAt"],
  });
  res.send(allPostInDb);
};

const createPost = async (req, res) => {
  const { caption, imageUrl } = req.body;
  const newPost = await db.Post.create({ caption, picture_url: imageUrl, user_id: req.user.id });
  res.status(201).send(newPost);
};

const deletePost = async (req, res) => {
  const postId = req.params.id;
  await db.Post.destroy({ where: { id: postId, user_id: req.user.id } });
  res.status(204).send();
};

const editPost = async (req, res) => {
  const postId = req.params.id;
  const { caption, picture_url } = req.body;
  await db.Post.update({ caption, picture_url: picture_url }, { where: { id: postId, user_id: req.user.id } });

  res.status(200).send({ message: "Updated" });
};

const getAllMyPost = async (req, res) => {
  const allPost = await db.Post.findAll({
    where: { user_id: req.user.id },
    include: [
      {
        model: db.Comment,
        attributes: ["id", "comment"],
        include: [{ model: db.User, attributes: ["id", "name", "profile_url"] }]
      },
      { model: db.User, attributes: ["id", "name", "profile_url"] }
    ],
    attributes: ["id", "caption", "picture_url", "createdAt", "updatedAt"],
  });
  res.status(200).send(allPost);
};

const getAllFriendPost = async (req, res) => {
  const userId = req.params.userId;
  const allPost = await db.Post.findAll({
    where: { user_id: userId },
    include: [
      {
        model: db.Comment,
        attributes: ["id", "comment"],
        include: [{ model: db.User, attributes: ["id", "name", "profile_url"] }]
      },
      { model: db.User, attributes: ["id", "name", "profile_url"] }
    ],
    attributes: ["id", "caption", "picture_url", "createdAt", "updatedAt"],
  });
  res.status(200).send(allPost);
};

const getMyFeed = async (req, res) => {
  const friendByIds = (await db.Friend.findAll({
    where: { status: "FRIEND", request_to_id: req.user.id }
  })).map(e => e.request_by_id);

  const friendToIds = (await db.Friend.findAll({
    where: { status: "FRIEND", request_by_id: req.user.id }
  })).map(e => e.request_to_id);

  const allFriendIds = [...friendByIds, ...friendToIds, req.user.id];

  const allFeeds = await db.Post.findAll({
    where: { user_id: allFriendIds },
    include: [
      {
        model: db.Comment,
        attributes: ["id", "comment"],
        include: [{ model: db.User, attributes: ["id", "name", "profile_url"] }]
      },
      { model: db.User, attributes: ["id", "name", "profile_url"] }
    ],
    attributes: ["id", "caption", "picture_url", "createdAt", "updatedAt"],
    order: [
      ['id', 'ASC'],
    ],
  });

  res.status(200).send(allFeeds);
};

module.exports = {
  createPost,
  deletePost,
  editPost,
  getAllMyPost,
  getAllFriendPost,
  getMyFeed,
  getAllPostWithoutAuth,
};