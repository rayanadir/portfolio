const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const dbo = require("../config/db");
const ObjectId = require("mongodb").ObjectId;
const bcrypt = require('bcrypt')

// Max age of token (3 days)
const timeLimit = 3*24*60*60*1000;

const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: timeLimit
    })
}

// register
module.exports.signUp= async (req,response) => {
    let db_connect = dbo.getDb();
    try{
        const {username, email, password, confirmPassword} = req.body;
        
        if(!email || !username || !password || !confirmPassword){
            return response.status(400).json({message:"One or several fields are missing.", msg_code:"field_miss"});
        }
        if(password.length<6){
            return response.status(400).json({message: "Password length must be at least 6 characters", msg_code:"password_length"});
        }
        if(password !== confirmPassword){
            return response.status(400).json({message:"The passwords are not identical",msg_code:"different_passwords"});
        }
        const isUserExists= await UserModel.findOne({email});
        if(isUserExists){
            return response.status(400).json({message:"An account already uses this email",msg_code:"account_exists"})
        }

        const salt = await bcrypt.genSalt();
        const passwordHash= await bcrypt.hash(password,salt);

        const newUser = new UserModel({
            email,
            username,
            password:passwordHash,
            first_login: new Date(),
            last_login: new Date(),
            isAdmin:false
        });
        db_connect.collection("users").insertOne(newUser,(err,res) => {
            if(err) {throw err;}
            response.status(201).json({res,user: user._id});
        })
    }catch(err){
        response.status(500).json({error:"Server error"});
    }
}

// login
module.exports.signIn= async (req,response) =>{
    let db_connect = dbo.getDb();
    try{
        const {email, password} = req.body;
        if(!email || !password){
            return response.status(400).json({message:"One or several fields are missing.",msg_code:"field_miss"})
        }
        const user = await UserModel.findOne({email});
        if(!user){
            return response.status(400).json({message:"Unknown email address",msg_code:"unknown_email"})
        }
        const correctPassword = await bcrypt.compare(password, user.password);
        if(!correctPassword){
            return response.status(400).json({message:"Incorrect password",msg_code:"incorrect_password"})
        }
        let token = createToken(user._id) 
        const update = {
            last_login: new Date(),
        }
        db_connect.collection('users').updateOne(user._id,update,(err,res)=> {
            if(err) {throw err;}
            response.status(201).json({token,res,user:{
                id:user._id,
                username:user.username,
                email:user.email,
            }})
        })
    }catch(err){
        response.status(500).json({error:"Server error"})
    }
}

module.exports.logout= (req,res) => {
    res.cookie('jwt','',{timeLimit:1});
    res.redirect('/');
}