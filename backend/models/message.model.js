<<<<<<< HEAD
const mongoose = require('mongoose');

const simpleMessageSchema = new mongoose.Schema({
    message: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    date: { type: Date, required: true },
    id: { type: String, required: true }
},{
    timestamps:true,
})

const Message = mongoose.model("message", simpleMessageSchema);

=======
const mongoose = require('mongoose');

const simpleMessageSchema = new mongoose.Schema({
    message: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String, required: true },
    date: { type: Date, required: true },
    id: { type: String, required: true }
},{
    timestamps:true,
})

const Message = mongoose.model("message", simpleMessageSchema);

>>>>>>> 83db87e87f565d2f30348d6a1cff769101b11d15
module.exports = Message;