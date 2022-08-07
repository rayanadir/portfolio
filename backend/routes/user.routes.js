const router = require("express").Router();
const authController = require("../controllers/auth.controller.js");
const userController = require('../controllers/user.controller.js');
const auth = require("../middleware/auth.middleware")

// register
router.post("/api/register", authController.signUp);

// login
router.post("/api/login", authController.signIn);

// logout
router.get("/api/logout", authController.logout);

// loggedIn
router.get("/api/loggedIn", authController.loggedIn);

// resetPassword
router.put("/api/resetPassword/:token", auth, authController.resetPassword);

// forgotPassword
router.put("/api/forgotPassword", authController.forgotPassword);

// changePassword
router.put("/api/changePassword", auth ,authController.changePassword);

// checkTokenValidity
router.post("/api/checkToken", authController.checkToken)

// getUser
router.post("/api/getUser",userController.getUser);

module.exports = router;