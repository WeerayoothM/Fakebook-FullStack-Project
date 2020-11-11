const passport = require("passport");
const { login, register, getUserById } = require("../controllers/user");
const router = require("express").Router();

const auth = passport.authenticate("jwt-auth", { session: false });

router.post("/login", login);
router.post("/register", register);
router.get("/:userId", auth, getUserById);


module.exports = router;