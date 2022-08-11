const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
 message: {type:String, required:true},
 userId: {type:String, required:true},
 date: {type: Date, required: true}   
},
{
    timestamps:true,
})

const conversationSchema = new mongoose.Schema({
    users: { type: Array, required: true},
    id: {type: new mongoose.Types.ObjectId().toHexString(), required:true},
    messages: [messageSchema]
},
{
    timestamps:true,
});

const Conversation = mongoose.model("conversation", conversationSchema);

module.exports = Conversation;