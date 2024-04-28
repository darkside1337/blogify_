const express = require("express");
const router = express.Router();
const { signup, login, logout } = require("../controllers/authController");
const {
  validateSignupData,
  validateLoginData,
} = require("../middleware/validationMiddleware");

//

router.post("/signup", validateSignupData, signup);
router.post("/login", validateLoginData, login);
router.post("/logout", logout);

module.exports = router;
