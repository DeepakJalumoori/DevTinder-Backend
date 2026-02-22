const express = require("express");
const userRouter = express.Router();
const {userAuth} = require("../../Middlewares/auth");
const ConnectionRequest = require("../models/connectionRequest");
const User = require("../models/user");

//Getting all the pending connection requests for the loggedIn user
userRouter.get("/user/requests/received",userAuth, async (req,res) => {
  try{
    const loggedInUser = req.user;

    const connectionRequests = await ConnectionRequest.find({
      toUserId : loggedInUser._id,
      status : "interested"
    }).populate("fromUserId", "firstName lastName about age photoUrl gender");

    res.json({
      message : "Data fetched successfully!!",
      data : connectionRequests
    });
  }catch(err){
    res.status(400).json({ message: "Something went wrong!!" });
  }
});

//Displaying all the connections of loggedInUser
userRouter.get("/user/connections",userAuth,async (req,res) => {
  try{
    const loggedInUser = req.user;

    const connections = await ConnectionRequest.find({
      $or : [
        {fromUserId : loggedInUser._id, status : "accepted"},
        {toUserId : loggedInUser._id, status : "accepted"}
      ]
    })
      .populate("fromUserId",["firstName","lastName" ,"about", "age", "photoUrl","gender"])
      .populate("toUserId",["firstName","lastName" ,"about", "age", "photoUrl","gender"])

      console.log(connections);

      const data = connections.map((row) => {
        if(row.fromUserId._id.toString() === loggedInUser._id.toString()){
          return row.toUserId;
        }
        return row.fromUserId;
      });
      res.json({myConnections : data});
  }catch(err){
    res.status(500).json({ message: "Something went wrong!!" });
  }
});

//Feed - API and pagination logic
userRouter.get("/user/feed",userAuth,async (req,res) => {
  try{
    const loggedInUser = req.user;

    const page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 20;
    limit = limit > 20 ? 20 : limit;
    const skip = (page - 1) * limit;

    const connectionRequests = await ConnectionRequest.find({
      $or : [
        {fromUserId : loggedInUser._id},
        {toUserId : loggedInUser._id},
      ]
    }).select("fromUserId toUserId");

    const hideUserFromFeed = new Set();

    connectionRequests.forEach((row) => {
      hideUserFromFeed.add(row.fromUserId);
      hideUserFromFeed.add(row.toUserId);
    });

    const users = await User.find({
      $and : [
        {_id : {$nin : Array.from(hideUserFromFeed)}},
        {_id : {$ne : loggedInUser._id}}
      ]
    })
    .select("firstName lastName photoUrl age about gender")
    .skip(skip)
    .limit(limit);

    res.send(users);
  }catch(err){
    res.status(500).json({ message: "Something went wrong!!" });
  }
});
module.exports = userRouter;