const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true },
  username:{type:String, required:true},
  passwordHash: { type: String, required: true },
  isAdmin: { type:Boolean, required:true },
  first_login : {type: Date, required: true},
  last_login : { type: Date, required:true}
}
);

const User = mongoose.model("user", userSchema);

module.exports = User;