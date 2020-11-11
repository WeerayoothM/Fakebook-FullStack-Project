const passport = require("passport");
const { getAllFriends, getAllRequests, sendRequestFriend, acceptRequest, denyRequest, deleteFriend, cancelRequest } = require("../controllers/friend");
const router = require("express").Router();

const auth = passport.authenticate("jwt-auth", { session: false });

router.get("/", auth, getAllFriends);
router.get("/requests", auth, getAllRequests);
router.post("/:userId", auth, sendRequestFriend);
router.put("/accept/:userId", auth, acceptRequest);
router.delete("/deny/:userId", auth, denyRequest);
router.delete("/:userId", auth, deleteFriend);
router.delete("/cancel/:userId", auth, cancelRequest);

module.exports = router;