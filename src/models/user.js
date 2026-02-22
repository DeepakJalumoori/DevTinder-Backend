const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt  = require("bcrypt");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  firstName : {
    type : String,
    minLength : 4,
    maxLength : 12,
  },
  lastName : {
    type : String
  },
  emailId : {
    type : String,
    required : true,
    unique : true,
    validate(value){
      if(!validator.isEmail(value)){
        throw new Error("Invalid emailId :" + value);
      }
    }
  },
  password : {
    type : String,
    trim:true,
    validate(value){
      if(!validator.isStrongPassword(value)){
        throw new Error("Weak password :" + value);
      }
    }
  },
  age : {
    type : Number
  },
  gender : {
    type : String
  },
  about : {
    type : String
  },
  photoUrl :{
    type : String
  }
},
{timestamps : true}
);

userSchema.methods.getJWT = async function(){
  const user = this;

  const token = await jwt.sign({_id : user._id},"DevTinder@2004",{
    expiresIn : "1y",
  });

  return token;
};

userSchema.methods.validatePassword = async function(passwordInputByUser){
  const user = this;
  const passwordHash = user.password;

  const isPasswordValid = await bcrypt.compare(passwordInputByUser,passwordHash);

  return isPasswordValid;
}

module.exports = mongoose.model("User",userSchema);