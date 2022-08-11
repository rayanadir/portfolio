const Conversation = require('../models/conversation.model');
const User = require('../models/user.model')

module.exports.newConversation = async (req,res) => {
    try{
        const { userId } = req.body;
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
        return res.status(201).json({message:"Conversation created", code_msg:"conversation_created"})
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
        const messageObj = {message,userId, date: new Date().toISOString()}
        await conversation.updateOne({
            $push:{messages: messageObj},
        });
        return res.status(201).json({message:"Message sent", code_msg:"message_sent"})
    } catch (error) {
       return res.status(500).send({ message: "Internal server error", code_msg: "server_error" });
    }
}

module.exports.getAllConversations = async (req,res) => {
    try{

    }catch(err){
        
    }
}