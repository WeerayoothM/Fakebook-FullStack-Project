const db = require("../models");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const register = async (req, res) => {
  const { username, password, name, profileUrl } = req.body;

  const targetUser = await db.User.findOne({ where: { username } });

  if (targetUser) {
    res.status(400).send({ message: "Username already taken." });
  } else {
    const salt = bcrypt.genSaltSync(Number(process.env.SALT_ROUND));
    const hashedPW = bcrypt.hashSync(password, salt);

    await db.User.create({
      username,
      name,
      password: hashedPW,
      profile_url: profileUrl
    });

    res.status(201).send({ message: "User created." });
  }
};

const login = async (req, res) => {
  const { username, password } = req.body;
  const targetUser = await db.User.findOne({ where: { username } });

  if (targetUser) {
    if (bcrypt.compareSync(password, targetUser.password)) {
      const token = jwt.sign({ id: targetUser.id }, process.env.SECRET, { expiresIn: 3600 });
      res.status(200).send({ token });
    } else {
      res.status(400).send({ message: "Username or password incorrect." });
    }
  } else {
    res.status(400).send({ message: "Username or password incorrect." });
  }
};

const getUserById = async (req, res) => {
  const userId = req.params.userId;
  const targetUser = await db.User.findOne({
    where: { id: userId },
    attributes: ["id", "name", "profile_url"]
  });
  const friendRala = await db.Friend.findOne({
    where: {
      [Op.or]: [
        { request_to_id: userId, request_by_id: req.user.id },
        { request_to_id: req.user.id, request_by_id: userId }
      ]
    }
  });

  if (targetUser && (+userId === +req.user.id)) {
    return res.status(200).send({ targetUser, message: "เราเองแหละ" });
  } else if (!friendRala && !targetUser) {
    return res.status(404).send({ message: "Notfound" });
  } else if (!friendRala && targetUser) {
    return res.status(200).send({ targetUser, message: "เพิ่มเพื่อน" });
  } else if (friendRala && friendRala.status === "FRIEND") {
    return res.status(200).send({ targetUser, message: "เพื่อน" });
  } else if (friendRala && friendRala.status === "PENDING" && friendRala.request_by_id === Number(userId)) {
    return res.status(200).send({ targetUser, message: "ตอบรับคำขอเป็นเพื่อน" });
  } else {
    return res.status(200).send({ targetUser, message: "ส่งคำขอเป็นเพื่อนแล้ว" });
  }
};

const getMyprofile = async (req, res) => {

}

module.exports = {
  register,
  login,
  getUserById,
};