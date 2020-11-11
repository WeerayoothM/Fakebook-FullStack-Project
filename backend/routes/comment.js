const passport = require("passport");
const { createComment, deleteComment, updateComment } = require("../controllers/comment");
const router = require("express").Router();

const auth = passport.authenticate("jwt-auth", { session: false });

router.post("/", auth, createComment);
router.delete("/:id", auth, deleteComment);
router.put("/:id", auth, updateComment);

module.exports = router;