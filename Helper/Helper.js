const Helper ={}
const Crypto = require("crypto-js");
const db= require("../conn/connection");
const User = require("../User/user");

Helper.response = (status, message, data = [], res, statusCode) => {
    res.status(statusCode).json({
      status: status,
      message: message,
      data: data,
    });
  };

Helper.encryptPassword = (password)=>{
    var pass = Crypto.AES.encrypt(password,process.env.SECRET_KEY).toString();
    return pass;

}
Helper.decryptPassword= (password)=>{
    var bytes = Crypto.AES.decrypt(password,process.env.SECRET_KEY);
    var originalPassword = bytes.toString(Crypto.enc.Utf8);
    return originalPassword;
}

module.exports =  Helper ;