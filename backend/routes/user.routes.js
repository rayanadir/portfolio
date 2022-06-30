const router = require('express').Router()
const authController = require('../controllers/auth.controller.js')

router.post('/api/user/register', authController.signUp)

module.exports = router;