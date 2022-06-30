const mongoose= require('mongoose');
const { isEmail } = require('validator');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 55,
        unique: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        validate: [isEmail],
        lowercase: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        max: 1024,
        minlength: 6,
    }
})

userSchema.pre("save", async (next) => {
    const salt = await bcrypt.genSalt();
    this.password= await bcrypt.hash(this.password, salt);
    next();
})

userSchema.statics.login = async (email, password) => {
    const user = await this.findOne({email});
    if(user){
        const auth = await bcrypt.compare(password, user.password);
        if(auth) return user;
        throw Error('incorrect password');
    }
    throw Error('incorrect email');
}

const UserModel = mongoose.model('user', userSchema);

module.exports = UserModel