const { Op } = require("sequelize");
const db = require("../models");

// Get All Friends
const getAllFriends = async (req, res) => {
  const friendByIds = (await db.Friend.findAll({
    where: { status: "FRIEND", request_to_id: req.user.id }
  })).map(e => e.request_by_id);

  const friendToIds = (await db.Friend.findAll({
    where: { status: "FRIEND", request_by_id: req.user.id }
  })).map(e => e.request_to_id);

  const allFriendIds = [...friendByIds, ...friendToIds].sort((a, b) => a - b);

  const allFriends = await db.User.findAll({
    where: { id: allFriendIds },
    attributes: ["id", "name", "profile_url"]
  });

  res.send(allFriends);
};

// Get All Requests
const getAllRequests = async (req, res) => {
  const getAllRequestIds = (await db.Friend.findAll({
    where: { request_to_id: req.user.id, status: "PENDING" }
  })).map(e => e.request_by_id);

  const allRequests = await db.User.findAll({
    where: { id: getAllRequestIds },
    attributes: ["id", "name", "profile_url"]
  });
  res.send(allRequests);
};

// Send request friend
const sendRequestFriend = async (req, res) => {
  const userId = req.params.userId;
  const friendRela = await db.Friend.create({
    request_to_id: userId,
    request_by_id: req.user.id,
    status: "PENDING"
  });

  res.send(friendRela);
};

// Accept request
const acceptRequest = async (req, res) => {
  const userId = req.params.userId;
  await db.Friend.update({
    status: "FRIEND"
  }, {
    where: { request_by_id: userId, request_to_id: req.user.id }
  });

  res.send({ message: "Accepted" });
};

// Deny request
const denyRequest = async (req, res) => {
  const userId = req.params.userId;
  await db.Friend.destroy({
    where: { status: "PENDING", request_by_id: userId, request_to_id: req.user.id }
  });

  res.send();
};

// Delete Friend
const deleteFriend = async (req, res) => {
  const userId = req.params.userId;
  await db.Friend.destroy({
    where: {
      [Op.or]: [
        { status: "FRIEND", request_by_id: userId, request_to_id: req.user.id },
        { status: "FRIEND", request_by_id: req.user.id, request_to_id: userId },
      ]
    }
  });

  res.send();
};

const cancelRequest = async (req, res) => {
  const userId = req.params.userId;
  await db.Friend.destroy({
    where: { status: "PENDING", request_by_id: req.user.id, request_to_id: userId }
  });

  res.send();
};

module.exports = {
  getAllFriends,
  getAllRequests,
  sendRequestFriend,
  acceptRequest,
  denyRequest,
  deleteFriend,
  cancelRequest,
};