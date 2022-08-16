const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
const corsOptions ={
  origin:'http://localhost:3000', 
  credentials:true,            //access-control-allow-credentials:true
  optionSuccessStatus:200
}
app.use(cors(corsOptions));

const Conversation = require('./models/conversation.model');
const User = require('./models/user.model');
const mongoose = require('mongoose');

const io = require('socket.io')(8900,{
  cors:{
      origin: "http://localhost:3000"
  }
})

io.on("connection",  (socket) => {

  const userId = socket.handshake.query.userId
  // get all conversations
  Conversation.find({}).sort({ updatedAt: -1 }).lean().exec(async (err, doc) => {
    if (err) {
      socket.emit('getConversations', [])
    } else if (doc) {
      const conversations = doc.map(async (conversation) => {
        const otherUser = conversation.users.find(u => u !== userId)
        const user = await User.findOne({ userId: otherUser })
        conversation.username = user.username
        return conversation;
      })
      Promise.all(conversations).then((values) => {
        socket.emit("getConversations", values)
      })
    }
  })

  // get all messages from a conversation
  const conversationId = socket.handshake.query.conversationId
  if(conversationId && conversationId!==null && conversationId!== undefined){
    Conversation.findOne({id:conversationId}).lean().exec(async (err,doc) => {
      if(err){
        socket.emit('getMessages' , [])
      }else if (doc) {
        socket.emit('getMessages' , doc.messages)
      }
    })
  }


  // send a message
  socket.on('newMessage', async (data) => {
    console.log(data)
    try {
      const conversationId =socket.handshake.query.conversationId
      if(conversationId !== undefined){
        const conversation = await Conversation.findOne({id: conversationId})
        const messageId = new mongoose.Types.ObjectId().toHexString()
        const messageObj = { message: data.message, userId: data.userId, date: new Date().toISOString(), id: messageId }
        await conversation.updateOne({
          $push: {messages: messageObj}
        })
        io.emit('newMessage', { message: data.message, userId: data.userId, date: new Date().toISOString(), id: messageId })
      }else if(conversationId === undefined){
        const adminUser = await User.findOne({ email: String(process.env.USER) });
        const newConversationId = new mongoose.Types.ObjectId().toHexString();
        const messageId=new mongoose.Types.ObjectId().toHexString();
        const newMessage =[{message:data.message, userId:data.userId, date: new Date().toISOString(), id: messageId}]
        const conversation = new Conversation({
            id: newConversationId,
            users:[userId,adminUser.userId],
            messages: newMessage
        });
        await conversation.save();
        io.emit('newMessage', { message: data.message, userId: data.userId, date: new Date().toISOString(), id: messageId })
      }
    } catch (error) {
      console.log(error)
    }
  })

  socket.on("disconnect",()=>{
    //console.log("disconnection");
  });
})

const getConversations = async (userId) => {
   Conversation.find({}).sort({ updatedAt: -1 }).lean().exec(async (err, doc) => {
    if (err) {
      return [];
    } else if (doc) {
      const conversations = doc.map(async (conversation) => {
        const otherUser = conversation.users.find(u => u !== userId)
        const user = await User.findOne({ userId: otherUser })
        conversation.username = user.username
        return conversation;
      })
      Promise.all(conversations).then((values) => {
        console.log(values)
      })
    }
  })
}

// get driver connection
require("./config/db");
app.use(express.json());
app.use(require("./routes/routes"))
 
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});