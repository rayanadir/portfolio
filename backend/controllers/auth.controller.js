const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Token = require('../models/token.model');
const { resetPassword } = require('../utils/emailTemplate');
const { sendEmail } = require('../utils/sendEmail');

// register
module.exports.signUp = async (req, res) => {
  try {
    const { email, username, password, confirmPassword } = req.body;
    // validation
    const usernameRegex = /^[a-zA-Z\-éëàèìòùÀÈÌÒÙáéíóúýÁÉÍÓÚÝâêîôûÂÊÎÔÛãñõÃÑÕäëïöüÿÄËÏÖÜŸçÇÆæœ]{3,}$/;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const usernameTest = usernameRegex.test(username);
    const emailTest = emailRegex.test(email);

    if (!email || !username || !password || !confirmPassword)
      return res
        .status(400)
        .json({
          message: "One or several fields are missing.",
          code_msg: "field_miss"
        });
    if (!usernameTest) {
      return res
        .status(400)
        .json({
          message: "Enter a valid username, at least 3 characters",
          code_msg: "invalid_username"
        })
    }
    if (!emailTest) {
      return res
        .status(400)
        .json({
          message: "Enter a valid email address",
          code_msg: "invalid_email"
        })
    }

    if (password.length < 6)
      return res.status(400).json({
        message: "Password length must be at least 6 characters",
        code_msg: "password_length",
      });

    if (password !== confirmPassword)
      return res.status(400).json({
        message: "The passwords are not identical",
        code_msg: "different_passwords"
      });

    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res.status(400).json({
        message: "An account already uses this email",
        code_msg: "account_exists",
      });

    // hash the password

    const salt = await bcrypt.genSalt();
    const passwordHash = await bcrypt.hash(password, salt);

    // save a new user account to the db

    const newUser = new User({
      email,
      username,
      passwordHash,
      isAdmin: false,
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
      .send({ message: "User successfully created !", code_msg: "user_created", token });
  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error", code_msg: "server_error" });
  }
}

// login
module.exports.signIn = async (req, res) => {
  try {
    const { email, password } = req.body;
    const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const emailTest = emailRegex.test(email);
    // validate
    if (!email && !password)
      return res
        .status(400)
        .json({ message: "Please enter all fields.", code_msg: "all_fields_miss" });
    if (!email)
      return res
        .status(400)
        .json({ message: "Please enter email.", code_msg: "email_miss" });
    if (!emailTest) {
      return res
        .status(400)
        .json({
          message: "Enter a valid email address",
          code_msg: "invalid_email"
        })
    }
    if (!password)
      return res
        .status(400)
        .json({ message: "Please enter password.", code_msg: "password_miss" });


    const existingUser = await User.findOne({ email });
    if (!existingUser)
      return res.status(401).json({ message: "Unknown email", code_msg: "unknown_email" });

    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (!passwordCorrect)
      return res.status(401).json({ message: "Incorrect password", code_msg: "incorrect_password" });

    await existingUser.updateOne({ last_login: new Date() })
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
      .send({ message: "User successfully logged in !", code_msg: "user_logged", token });

  } catch (err) {
    console.error(err);
    res.status(500).send({ message: "Internal server error", code_msg: "server_error" });
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

// resetPassword
module.exports.resetPassword = (req, res) => {
  try {
    const token = req.params.token;
    const { newPassword } = req.body;
    console.log('object')
    if(!newPassword){
      return res.status(400)
      .json({
        message:"Enter password",
        code_msg:"password_miss",
        status:'fail',
      })
    }
    if(newPassword.length<6){
      return res.status(400)
      .json({
          message: "Password length must be at least 6 characters",
          code_msg: "password_length",
          status:'fail',
      })
    }
    const userToken = jwt.verify(token, process.env.JWT_RESET_KEY);
    Token.findOne({ userId: userToken._id, token, tokenType: 'resetPassword' }, async (err, doc) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: 'fail',
          message: "Invalid token",
          code_msg:"invalid_token",
        });
      }
      const user = await User.findOne({ email: userToken.email });
      bcrypt.hash(newPassword, 10, (err, hash) => {
        if (err) {
          console.log(err);
          return res.status(500).json({
            status: 'fail',
            message: "Error, cannot encrypt password",
            code_msg:"encrypy_password_error",
          });
        }
        user.passwordHash = hash;
        user
          .save()
          .then(async (result) => {
            await Token.findOneAndDelete({ userId: user._id, tokenType: 'resetPassword' });
            res.status(200).json({
              status: 'success',
              message: "Password reset successfully",
              code_msg:"password_reset",
            });
          })
          .catch((err) => {
            res.status(500).json({
              status: 'fail',
              message: "server error",
              code_msg:"server_error",
            });
          });
      });
    })
  } catch (error) {
    res.status(500).json({
      status: 'fail',
      message: "Server error",
      code_msg:"server_error",
    });
  }
}

// forgotPassword
module.exports.forgotPassword = (req, res) => {
  const { email } = req.body;
  const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const emailTest = emailRegex.test(email);
  User.findOne({ email }, (err, user) => {
    if (err) {
      return res.status(500)
        .json({
          status: 'fail',
          message: "Server error",
          code_msg: "server_error",
        })
    }
    if (!email) {
      return res.status(400).
        json({
          message: "Enter email",
          code_msg: "email_miss",
          status: 'fail',
        })
    }
    if (!emailTest) {
      return res.status(400)
        .json({
          message: "Invalid email",
          code_msg: "invalid_email",
          status: 'fail',
        })
    }
    if (!user) {
      return res.status(400).json({
        status: 'fail',
        message: "Unknown email",
        code_msg: "unknown_email",
      })
    }
    const token = jwt.sign(
      {
        user: user._id
      },
      process.env.JWT_RESET_KEY,
      {
        expiresIn: "7d",
      }
    )
    Token.findOneAndUpdate({ userId: user._id, tokenType: "resetPassword" }, { token: token }, {
      new: true, upsert: true
    }, (err, doc) => {
      if (doc) {
        console.log(token);
        const emailTemplate = resetPassword(email, token);
        sendEmail(emailTemplate);
        res.status(200).json({
          status: 'success',
          message: "Email for reset password has been sent",
          code_msg: "email_sent"
        })
      } else if(err) {
        return res.status(500).json({
          status: 'fail',
          message: "Server error",
          code_msg: "server_error",
        })
      }
    });
  })
}

// changePassword
module.exports.changePassword = async (req, res) => {
  const { oldPassword, newPassword, newConfirmPassword } = req.body;
  if(!oldPassword || !newPassword || !newConfirmPassword){
    return res.status(400).json({
      message: "Please enter all fields.", code_msg: "all_fields_miss", status:'fail' 
    })
  }
  if(newPassword.length<6){
    return res.status(400).json({
      message: "Password length must be at least 6 characters",
      code_msg: "password_length",
      status:'fail',
    })
  }
  if(newPassword !== newConfirmPassword){
    return res.status(400).json({
      message: "The passwords are not identical",
      code_msg: "different_passwords",
      status:'fail',
    })
  }
  const userId = req.user;
  const user = await User.findById(userId);
  if (user) {
    bcrypt.compare(oldPassword, user.passwordHash, (err, isMatch) => {
      if (err) {
        return res.status(500).json({
          status: 'fail',
          message: "Server error",
          code_msg:"server_error",
        })
      } else if (isMatch) {
        bcrypt.hash(newPassword, 10, async (err, hash) => {
          if (err) {
            return res.status(500).json({
              status: 'fail',
              message: "Error, cannot encrypt password",
              code_msg:"encrypy_password_error",
            })
          }
          user.passwordHash = hash;
          user.save().then(updatedUser => {
            return res.status(200).json({
              status: 'success',
              message: "Password has been changed successfully",
              code_msg:"password_changed",
            })
          })
        })
      } else {
        return res.status(401).json({
          status: 'fail',
          message: "Old password incorrect",
          code_msg:"current_password_incorrect",
        })
      }
    })
  }
}
