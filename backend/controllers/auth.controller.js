const UserModel = require('../models/user.model');
const jwt = require('jsonwebtoken');
const { signUpErrors, signInErrors } = require('../utils/errors.utils');
const dbo = require("../configuration/database");


// Max age of token (3 days)
const timeLimit = 3*24*60*60*1000;

const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: timeLimit
    })
}

module.exports.signUp= async (req,response) => {
    const {username, email, password} = req.body;
    console.log(req.body);
    let db_connect = dbo.getDb();
    try{
        const user = await UserModel.create({username, email, password});
        res.status(201).json({user: user._id});
        db_connect.collection("users").insertOne(user,(err,res) => {
            if(err) throw err;
            response.json(res)
        })
    }catch(err){
        const errors = signUpErrors(err)
        res.status(200).send({errors});
    }
}

module.exports.signIn= async (req,res) =>{
    const {email, password} = req.body;
    try{
        const user = await UserModel.login(email, password)
        const token = createToken(user._id);
        res.cookie('jwt', token, {httpOnly: true, timeLimit});
        res.status(200).json({user: user._id});
    }catch(err){
        const errors = signInErrors(err);
        res.status(200).json({errors});
    }
}

module.exports.logout= (req,res) => {
    res.cookie('jwt','',{timeLimit:1});
    res.redirect('/');
}