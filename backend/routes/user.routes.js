const router = require('express').Router();
const authController = require("../controllers/auth.controller.js");
const userController = require('../controllers/user.controller.js');

// auth requests
router.post('/api/register', authController.signUp);

router.post('/api/login', authController.signIn);
router.post('/api/logout', authController.logout);

// user requests
router.delete("/api/delete/:id", userController.deleteUser);

module.exports = router;