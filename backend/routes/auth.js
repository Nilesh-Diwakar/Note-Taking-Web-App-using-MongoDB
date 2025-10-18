

const express = require("express");
const router = express.Router();
const { signup, login, me, logout } = require("../controllers/authUser");

// Routes
router.post("/signup", signup);
router.post("/login", login);
router.get("/me", me);        // get logged-in user
router.post("/logout", logout); // logout

module.exports = router;
