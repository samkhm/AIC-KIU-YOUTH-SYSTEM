const express = require("express");
const { registerUser, loginUser, cornfirmIdentifier, resetPassword } = require("../controllers/authUserController");
const { authorize } = require("../middleware/auth")
const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post('/cornfirmIdentifier', cornfirmIdentifier)
router.put('/resetPassword/:id', resetPassword)
// router.get()

module.exports = router;