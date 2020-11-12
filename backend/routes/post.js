const { createPost, likePost, deletePost, unLikePost, editPost, getAllMyPost, getMyFeed, getAllPostWithoutAuth, getAllFriendPost } = require("../controllers/post");
const router = require("express").Router();
const passport = require("passport");

const auth = passport.authenticate("jwt-auth", { session: false });

router.get("/", auth, getAllMyPost);
router.get("/feed", auth, getMyFeed);
router.get("/:userId", auth, getAllFriendPost);
router.post("/", auth, createPost);
router.post('/like/:id', auth, likePost)
router.delete("/:id", auth, deletePost);
router.delete("/like/:id", auth, unLikePost);
router.put("/:id", auth, editPost);
router.get("/all-post", getAllPostWithoutAuth);

module.exports = router;