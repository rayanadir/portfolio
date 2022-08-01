const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt')

// register
module.exports.signUp = async (req, res) => {
    try {
      const { email, username ,password, confirmPassword } = req.body;
      // validation
  
      if (!email || !username || !password || !confirmPassword)
        return res
          .status(400)
          .json({ errorMessage: "Please enter all required fields." });
  
      if (password.length < 6)
        return res.status(400).json({
          errorMessage: "Please enter a password of at least 6 characters.",
        });
  
      if (password !== confirmPassword)
        return res.status(400).json({
          errorMessage: "Please enter the same password twice.",
        });
  
      const existingUser = await User.findOne({ email:email });
      if (existingUser)
        return res.status(400).json({
          errorMessage: "An account with this email already exists.",
        });
  
      // hash the password
  
      const salt = await bcrypt.genSalt();
      const passwordHash = await bcrypt.hash(password, salt);
  
      // save a new user account to the db
  
      const newUser = new User({
        email,
        username,
        passwordHash,
        isAdmin:false,
        first_login: new Date(),
        last_login: new Date(),
      });
  
      const savedUser = await newUser.save();
  
      // sign the token
      const token = jwt.sign(
        {
          user: savedUser._id,
        },
        process.env.TOKEN_SECRET
      );
  
      // send the token in a HTTP-only cookie
      res
        .status(201)
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .send({message:"User successfully created !", code_msg:"user_created"});
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
}

// login
module.exports.signIn = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      // validate
      if(!email && !password)
        return res
            .status(400)
            .json({ errorMessage: "Please enter all fields.", code_msg:"all_fields_miss" });
      if (!email)
        return res
          .status(400)
          .json({ errorMessage: "Please enter email.", code_msg:"email_miss" });
      if (!password)
          return res
            .status(400)
            .json({ errorMessage: "Please enter password.", code_msg:"password_miss" });
  
  
      const existingUser = await User.findOne({ email });
      if (!existingUser)
        return res.status(401).json({ errorMessage: "Unknown email", code_msg:"unknown_email" });
  
      const passwordCorrect = await bcrypt.compare(
        password,
        existingUser.passwordHash
      );
      if (!passwordCorrect)
        return res.status(401).json({ errorMessage: "Incorrect password", code_msg:"incorrect_password" });
  
      await existingUser.updateOne({last_login: new Date()})
      // sign the token
  
      const token = jwt.sign(
        {
          user: existingUser._id,
        },
        process.env.TOKEN_SECRET
      );
  
      // send the token in a HTTP-only cookie
      res
        .status(201)
        .cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .send({message:"User successfully logged in !", code_msg:"user_logged"});
        
    } catch (err) {
      console.error(err);
      res.status(500).send();
    }
}

// logout
module.exports.logout = (req, res) => {
    res
      .cookie("token", "", {
        httpOnly: true,
        expires: new Date(0),
        secure: true,
        sameSite: "none",
      })
      .send();
}

// loggedIn
module.exports.loggedIn = (req, res) => {
    try {
      const token = req.cookies.token;
      if (!token) return res.json(false);
  
      jwt.verify(token, process.env.TOKEN_SECRET);
  
      res.send(true);
    } catch (err) {
      res.json(false);
    }
}
