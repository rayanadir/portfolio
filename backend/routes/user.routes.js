const router = require("express").Router();
const authController = require("../controllers/auth.controller.js");
const userController = require('../controllers/user.controller.js');

// register
router.post("/api/register", authController.signUp);

// login
router.post("/api/login", authController.signIn);

// logout
router.get("/api/logout", authController.logout);

// loggedIn
router.get("/api/loggedIn", authController.loggedIn);


module.exports = router;