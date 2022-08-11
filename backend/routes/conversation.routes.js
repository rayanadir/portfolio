const router = require("express").Router();
const conversationController = require('../controllers/conversation.controller');

// start new conversation
router.post("/api/newConversation", conversationController.newConversation);

// send message
router.post("/api/sendMessage", conversationController.sendMessage)