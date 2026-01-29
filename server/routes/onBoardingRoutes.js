const express = require("express");
const { registerUser, loginUser } = require("../controllers/authUserController");
const { authorize } = require("../middleware/auth")
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
// router.get()

module.exports = router;