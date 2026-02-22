const express = require("express");
const {userAuth} = require("../../Middlewares/auth");
const {validateEditProfile} = require("../utils/validation");

const profileRouter = express.Router();


profileRouter.get("/profile",userAuth, async (req,res) => {
   try{
    const user = req.user;
    res.send(user);
  }
  catch(err){
    res.status(400).send(err.message);
  }
});

//Edit API - editing the profile
profileRouter.patch("/edit",userAuth,async (req,res) => {
  try{
    if(!validateEditProfile(req)){
      throw new Error("Invalid edit request!!");
    };
    
    const loggedInUser = req.user;
    console.log(loggedInUser);

    Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    console.log(loggedInUser);

    await loggedInUser.save();
    res.json({
      message : `${loggedInUser.firstName}, Your profile updated successfully..`,
      data : loggedInUser
    });
  }catch(err){
    res.status(400).send("Errorr" + err.message);
  }
});

module.exports = profileRouter;