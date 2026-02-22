const express = require("express");
const bcrypt = require("bcrypt");
const {validateSignup} = require("../utils/validation");
const User = require("../models/user");


const authRouter = express.Router();

authRouter.post("/signup", async (req,res) => {
 
  try{
  //validate details of the user
    validateSignup(req.body);
    const {firstName,lastName,emailId,password} = req.body;

  //Encrypting the password
  const passwordHash = await bcrypt.hash(password,10);
  console.log(passwordHash);

  //creating a instance of the User model
  const user = new User({
    firstName,
    lastName,
    emailId,
    password : passwordHash
  });


    const savedUser = await user.save();

    const token = await savedUser.getJWT();
    res.cookie("token",token);
    res.json({message : "User added successfully" , data:savedUser});
  }catch(err){
    res.status(400).send("Errorrrr : " + err.message)
  }  
});


authRouter.post("/login",async (req,res) => {
  try{
    const {emailId,password} = req.body;
    const user = await User.findOne({emailId : emailId});
    if(!user){
      throw new Error("Invalid credentials!");
    }
    const isPasswordValid  = await user.validatePassword(password);
    if(isPasswordValid){
      //Adding token to the cookie and sending it back to the user
      const token = await user.getJWT();
      res.cookie("token",token);
      res.send(user);
      
    }else{
      throw new Error("Invalid credentials!");
    }
  }
  catch(err){
    res.status(400).send(err.message)
  }
});

authRouter.post("/logout", (req,res) => {
  res.cookie("token",null,{
    expiresIn : new Date(Date.now())
  })

  res.send("Logout Successfull..")
});

module.exports = authRouter;