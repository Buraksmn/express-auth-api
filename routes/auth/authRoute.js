const express = require("express");
const router = express.Router();

const {
  register,
  login,
  forgot,
  resetPw,
} = require("../../controllers/auth/auth");

router.post("/register", register);
router.post("/login", login);
router.post("/forgot", forgot);
router.post("/resetPassword", resetPw);

module.exports = router;
