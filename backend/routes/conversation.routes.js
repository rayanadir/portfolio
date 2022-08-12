const router = require("express").Router();
const conversationController = require('../controllers/conversation.controller');
const conversation = require("../middleware/conversation.middleware")

// start new conversation
router.post("/api/newConversation", conversation,conversationController.newConversation);

// send message
router.post("/api/sendMessage", conversation,conversationController.sendMessage);

// get single conversation
router.post("/api/conversation/:id", conversation,conversationController.getSingleConversation);

// get all conversations
router.post("/api/conversations", conversation,conversationController.getAllConversations);