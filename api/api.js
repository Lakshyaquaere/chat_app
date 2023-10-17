const express = require("express");
const app = express();
const path = require("path");
const jwt = require("jsonwebtoken");
const user = require("../chat/chat");
const sequelize = require("../conn/connection");
const User = require("../User/user");
const bodyParser = require("body-parser");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const validator = require("validator");
const Helper = require("../Helper/Helper");



exports.ChatPage = async (req, res) => {
  try {
    res.sendFile(__dirname + "/chat.html");
  } catch (err) {}
};
exports.Main = async (req, res) => {
  try {
    res.sendFile(__dirname + "/main.html");
  } catch (err) {}
};
//REGISTRATION Page
exports.Registration = async (req, res) => {
  try {
    res.sendFile(__dirname + "/registration.html");
  } catch (err) {}
};
exports.Login = async (req, res) => {
  try {
    res.sendFile(__dirname + "/login.html");
  } catch (err) {}
};
//REGISTRATION
exports.PostRegistration = async (req, res) => {
  try {
    //email vlidation
    var email = req.body.email;
    const valid = validator.isEmail(email);
    const uservalid = await User.findOne({where:{username:req.body.username}});
    
  
    if(uservalid){
      res.send("user already exist");
    }
    else{  if (valid == 0) {
      res.redirect("http://localhost:8000/registration?email-fail=true");
    } else {
      User.create({
        username: `${req.body.username}`,
        password: Helper.encryptPassword(`${req.body.password}`),
      })
        .then(() => {})
        .catch((err) => {
          console.log(err);
        });
      res.redirect("http://localhost:8000/registration?success=true");
    }}
  
  } catch (err) {}
};

//Login validation
exports.PostLogin = async (req, res) => {
  try {
    const data = {
      username: req.body.username,
      password: req.body.password,
    };
    const users = await User.findOne({ where: { username: data.username } });
    const password = Helper.decryptPassword(users.dataValues.password);
    if (user) {
      if (password === data.password) {
        let token = jwt.sign(
          { username1: data.username },
          process.env.SECRET_KEY,
          {
            expiresIn: "50m",
          }
        );
        res.sendFile(__dirname + "/chat.html");

        // Helper.response(
        //   "Success",
        //   "Authentication Success",
        //   {
        //     username: data.username,
        //     token: token,
        //   },
        //   res,
        //   200
        // );
      } else {
        Helper.response(
          "Failed",
          "Username or Password id wrong",
          {},
          res,
          200
        );
      }
    } else {
      Helper.response("Failed", "Authentication Failed", {}, res, 200);
    }
  } catch (err) {}
};


