const express = require("express");
const {userAuth} = require("../../Middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");
const { Connection } = require("mongoose");

const requestRouter = express.Router();



requestRouter.post("/request/send/:status/:toUserId",
  userAuth,
  async (req,res) => {
    try{
      const fromUserId = req.user._id;
      const toUserId = req.params.toUserId;
      const status = req.params.status;

      //validating the status
      const allowedStatus = ["interested","ignored"];
      if(!allowedStatus.includes(status)){
        throw new Error("Invalid status type");
      }

      const toUser = await User.findById(toUserId);
      if(!toUser){
        return res.status(400).json({message : "user not found"});
      }

      const existingConnectionRequest = await ConnectionRequest.findOne({
        $or : [
          {fromUserId,toUserId},
          {fromUserId : toUserId,toUserId : fromUserId}
        ]
      });
      if(existingConnectionRequest){
        return res
          .status(400)
          .send({message : "connection request already exists!!"})
      }

      const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status
      });
      const data = await connectionRequest.save();
      res.json({
        message : req.user.firstName + " is " + status + " in " + toUser.firstName,
        data
      });
    }
    catch(err){
      res.status(400).send(err.message);
    }
});

requestRouter.post(
  "/request/review/:status/:requestId",
  userAuth,
  async (req,res) => {
    try{
      const loggedInUser = req.user;
      const {status,requestId} = req.params;

    const isAllowedStatus = ["accepted","rejected"];
    if(!isAllowedStatus.includes(status)){
      return res.status(400).json({message : "status not allowed"});
    }

    const connectionRequest = await ConnectionRequest.findOne({
      _id : requestId,
      toUserId : loggedInUser._id,
      status : "interested"
    });

    if(!connectionRequest){
      return res
        .status(400)
        .json({message : "connection request not found.."})
    };

    connectionRequest.status = status;

    const data = await connectionRequest.save();

    res.json({message : "connection Request " + status , data});
    }catch(err){
      res.status(400).send("Errorrrr" + err.message);
    }
  }
);


module.exports = requestRouter;