const Conversation = require('../models/conversation.model');
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports.newConversation = async (req,res) => {
    try{
        const { userId } = req.body;
        console.log(userId);
        const adminUser = await User.findOne({ email : String(process.env.USER) });
        if(!adminUser){
            return res.status(400).json({
                message: "No admin found",
                code_msg:"no_admin"
            })
        }
        const id = new mongoose.Types.ObjectId().toHexString()
        const newConversation = new Conversation({
            id,
            users:[userId,adminUser.userId],
            messages: [],
        })
        await newConversation.save();
        const token = jwt.sign(
            {
              userId,
            },
            process.env.TOKEN_SECRET,
            {expiresIn:'24h'},
          );
        return res.status(201)
        .cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })
        .json({message:"Conversation created", code_msg:"conversation_created"})
    }catch(err){
        console.error(err);
        return res.status(500).send({ message: "Internal server error", code_msg: "server_error" });
    }
}

module.exports.sendMessage = async (req,res) => {
    try {
        const {userId, message, id} = req.body;
        const conversation = await Conversation.findOne({id});
        if(!conversation){
            return res.status(400).json({
                message: "No conversation found",
                code_msg:"no_conversation"
            })
        }
        const messageId = new mongoose.Types.ObjectId().toHexString()
        const messageObj = {message,userId, date: new Date().toISOString(), id: messageId}
        await conversation.updateOne({
            $push:{messages: messageObj},
        });
        const token = jwt.sign(
            {
              userId,
            },
            process.env.TOKEN_SECRET,
            {expiresIn:'24h'},
          );
        return res.status(201)
        .cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })
        .json({message:"Message sent", code_msg:"message_sent"})
    } catch (error) {
       return res.status(500).send({ message: "Internal server error", code_msg: "server_error" });
    }
}

module.exports.getSingleConversation = async (req,res) => {
    try{
        const {id, userId} = req.params;
        const conversation = await Conversation.findOne({id});
        if(!conversation){
            return res.status(400).json({
                message: "No conversation found",
                code_msg:"no_conversation"
            })
        }
        const token = jwt.sign(
            {
              userId,
            },
            process.env.TOKEN_SECRET,
            {expiresIn:'24h'},
          );

        return res
        .cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })
        .status(201).json({message:"Conversation found", code_msg:"conversation_found", conversation});
    }catch(err){
        return res.status(500).send({ message: "Internal server error", code_msg: "server_error" });
    }
}

module.exports.getAllConversations = async (req,res) => {
    try{
        const { userId } = req.body
        const conversations = await Conversation.find({});
        if(!conversations){
            return res.status(400).json({
                message: "No conversations found",
                code_msg:"no_conversations"
            })
        }
        const token = jwt.sign(
            {
              userId,
            },
            process.env.TOKEN_SECRET,
            {expiresIn:'24h'},
          );
        return res
        .cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
        })
        .status(201).json({message:"Query all conversations", code_msg:"query_all_conversations", conversations});
    }
    catch(err){
        return res.status(500).send({ message: "Internal server error", code_msg: "server_error" });
    }
}